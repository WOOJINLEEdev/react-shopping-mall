import axios, { AxiosError } from "axios";
import * as Sentry from "@sentry/react";

export class SentryError extends Error {
  private e: Error;
  constructor(e: Error) {
    super(e.message);

    this.e = e;

    if (typeof Error.captureStackTrace !== "undefined") {
      Error.captureStackTrace(this, this.constructor);
    }

    this.handleAxiosError();
  }

  handleAxiosError() {
    if (!axios.isAxiosError(this.e)) {
      return;
    }
    const err = this.e as AxiosError;
    const { method, url, params, data: requestData, headers } = err.config;

    Sentry.setContext("API Request Detail", {
      method,
      url,
      params,
      requestData,
      headers,
    });

    if (err.response) {
      const { data, status } = err.response;
      Sentry.setContext("API Response Detail", {
        status,
        data,
      });
    }
  }
}
