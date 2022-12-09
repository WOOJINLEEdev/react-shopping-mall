import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Formik,
  Form,
  ErrorMessage,
  Field,
  FormikValues,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import * as Sentry from "@sentry/react";
import { useSetRecoilState } from "recoil";

import useHttpClient from "hooks/useHttpClient";
import { userId, userPassword } from "utils/login-validation";
import { SentryError } from "utils/error";
import { createSocialLoginApi, createLoginApi } from "api";

import { tokenState } from "App";

interface IValues {
  userId: string;
  userPassword: string;
}

const LogIn = () => {
  const { naver } = window;
  const [naverIdToken, setNaverIdToken] = useState("");

  const setToken = useSetRecoilState(tokenState);

  const location = useLocation();
  const navigate = useNavigate();
  const instance = useHttpClient();

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();

    async function createSocialLogin() {
      try {
        const res = await createSocialLoginApi({
          instance,
          socialType: "naver",
          accessToken: naverIdToken,
        });

        loginCheck(res);
      } catch (err) {
        Sentry.captureException(new SentryError(err as Error));
      }
    }

    if (naverIdToken) {
      createSocialLogin();
    }
  }, [naverIdToken]);

  const initialValues = {
    userId: "",
    userPassword: "",
  };

  const validationSchema = Yup.object({
    userId: userId(),
    userPassword: userPassword(),
  });

  const handleFormSubmit = async (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<IValues>,
  ) => {
    setSubmitting(true);
    try {
      const res = await createLoginApi({
        instance,
        userId: values.userId,
        userPassword: values.userPassword,
      });
      setToken(res.data);
      loginCheck(res);
    } catch (err: any | AxiosError) {
      Sentry.captureException(new SentryError(err as Error));
      if (axios.isAxiosError(err)) {
        err = err as AxiosError;
        if (err.response.data.error === "user not found") {
          return alert("등록된 아이디가 없습니다.");
        }

        if (err.response.data.error === "password not equal") {
          return alert("비밀번호가 일치하지 않습니다.");
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  function loginCheck(response: AxiosResponse) {
    if (!response.data) {
      return false;
    }

    window.location.replace("/mypage");
  }

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 3, width: "200", height: "50" },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const naverToken = location.hash.split("=")[1].split("&")[0];
    setNaverIdToken(naverToken);
  };

  const onSuccess = async (response: any) => {
    try {
      const res = await createSocialLoginApi({
        instance,
        socialType: "google",
        profile: {
          id: response.profileObj.googleId,
          name: response.profileObj.name,
          email: response.profileObj.email,
        },
      });
      loginCheck(res);
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
    try {
      const res = await createSocialLoginApi({
        instance,
        socialType: "google",
        profile: {
          id: response.profileObj.googleId,
          name: response.profileObj.name,
          email: response.profileObj.email,
        },
      });

      loginCheck(res);
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
  };

  const onFailure = (error: any) => {
    console.log(error);
  };

  const handleJoinBtnClick = () => {
    navigate("/join");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="login_form">
          <div className="login_wrap">
            <fieldset className="login_fieldset">
              <legend className="visually_hidden">로그인</legend>
              <div>
                <label htmlFor="userId" className="visually_hidden">
                  아이디
                </label>
                <Field
                  type="text"
                  name="userId"
                  id="userId"
                  className="login_input id"
                  placeholder="아이디"
                />
                <ErrorMessage
                  name="userId"
                  component="div"
                  className="input_check"
                />
              </div>
              <div>
                <label htmlFor="userPassword" className="visually_hidden">
                  비밀번호
                </label>
                <Field
                  type="password"
                  name="userPassword"
                  id="userPassword"
                  className="login_input password"
                  placeholder="비밀번호"
                  autoComplete="off"
                />
                <ErrorMessage
                  name="userPassword"
                  component="div"
                  className="input_check"
                />
              </div>
              <button
                type="submit"
                id="logInButton"
                className="login_btn"
                disabled={isSubmitting}
              >
                로그인
              </button>

              <BtnWrap>
                <SocialBtnWrap>
                  <NaverLoginBtn
                    type="button"
                    id="naverIdLogin"
                    onClick={initializeNaverLogin}
                    aria-label="네이버 아이디로 로그인"
                  />
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
                    buttonText="구글 아이디로 로그인"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                  />
                </SocialBtnWrap>

                <JoinBtn type="button" onClick={handleJoinBtnClick}>
                  회원가입
                </JoinBtn>
              </BtnWrap>
            </fieldset>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LogIn;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  margin-top: 20px;
  text-align: center;
  padding-top: 20px;
  border-top: 3px solid #efefef;

  @media only screen and (min-width: 320px) and (max-width: 600px) {
    flex-direction: column;
    justify-content: space-between;
    height: 160px;
  }
`;

const SocialBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 200px;
  min-heigth: 120px;

  button,
  img {
    min-width: 200px;
    max-width: 200px;
  }

  @media only screen and (min-width: 320px) and (max-width: 600px) {
    justify-content: space-evenly;
    height: 120px;

    button {
      margin: 0 auto;
    }
  }
`;

const NaverLoginBtn = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
`;

const JoinBtn = styled.button`
  width: 45%;
  height: 100%;
  margin: 0;
  border: 2px solid #d4d4d4;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;

  @media only screen and (min-width: 320px) and (max-width: 600px) {
    width: 200px;
    height: 50px;
    margin: 0 auto;
  }
`;
