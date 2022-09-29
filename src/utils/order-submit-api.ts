import * as Sentry from "@sentry/react";
import { AxiosInstance } from "axios";

import { SentryError } from "utils/error";
import { updateCheckoutsApi } from "api";

import { IDeliveryInfoState } from "state/order";

interface ISubmitCheckoutProps {
  instance: AxiosInstance;
  checkoutDeliveryData: IDeliveryInfoState;
  checkoutPaymentData: string;
  checkoutTotalDetailData: ICheckoutTotalDetailData;
  checkoutData: ICheckoutData;
  checkoutNumber: number;
}

interface ICheckoutData {
  user: IUser;
}

interface IUser {
  shipping_address: IShippingAddress;
}

interface IShippingAddress {
  address1: string;
  address2: string;
  name?: string;
  note?: string;
  phone1: string;
  postal_code: string;
  recipient_name: string;
  request_note?: string;
}

interface ICheckoutTotalDetailData {
  agreeChecked: boolean;
  finalPrice: number;
  selectCouponId: number;
  usedMileage: number;
}

export async function submitCheckout({
  instance,
  checkoutDeliveryData,
  checkoutPaymentData,
  checkoutTotalDetailData,
  checkoutData,
  checkoutNumber,
}: ISubmitCheckoutProps) {
  if (checkoutDeliveryData.deliveryClassName === "delivery_write selected") {
    try {
      await updateCheckoutsApi({
        instance,
        checkoutNumber,
        shippingAddress: {
          name: checkoutDeliveryData.designation,
          recipient_name: checkoutData.user.shipping_address.recipient_name,
          postal_code: checkoutData.user.shipping_address.postal_code,
          address1: checkoutData.user.shipping_address.address1,
          address2: checkoutData.user.shipping_address.address2,
          note: checkoutDeliveryData.requirement
            ? checkoutDeliveryData.requirement
            : "",
          phone1: checkoutData.user.shipping_address.phone1,
          request_note: checkoutDeliveryData.requirement,
        },
        userCouponIdToBeUsed: checkoutTotalDetailData.selectCouponId,
        mileageToBeUsed: Number(checkoutTotalDetailData.usedMileage),
        paymentMethod: checkoutPaymentData,
      });

      window.location.replace(`/orderCheck/${checkoutNumber}`);
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
  }

  if (checkoutDeliveryData.deliveryClassName1 === "delivery_write selected") {
    try {
      await updateCheckoutsApi({
        instance,
        checkoutNumber,
        shippingAddress: {
          name: checkoutDeliveryData.designation,
          recipient_name: checkoutDeliveryData.recipient,
          postal_code: checkoutDeliveryData.address1,
          address1: checkoutDeliveryData.addressDetail1,
          address2: checkoutDeliveryData.addressDetail2,
          note: checkoutDeliveryData.requirement1
            ? checkoutDeliveryData.requirement1
            : "",
          phone1:
            checkoutDeliveryData.tel1 +
            checkoutDeliveryData.tel2 +
            checkoutDeliveryData.tel3,
          phone2: checkoutDeliveryData.tel4
            ? checkoutDeliveryData.tel4 +
              checkoutDeliveryData.tel5 +
              checkoutDeliveryData.tel6
            : "",
          request_note: checkoutDeliveryData.requirement1,
        },
        userCouponIdToBeUsed: checkoutTotalDetailData.selectCouponId,
        mileageToBeUsed: Number(checkoutTotalDetailData.usedMileage),
        paymentMethod: checkoutPaymentData,
      });

      window.location.replace(`/orderCheck/${checkoutNumber}`);
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
  }
}
