import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { userId, userPassword } from "utils/login-validation";
import { instance } from "utils/http-client";
import styled from "styled-components";
import GoogleLogin from "react-google-login";

const LogIn = () => {
  const { naver } = window;
  const location = useLocation();
  const [naverIdToken, setNaverIdToken] = useState();

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();

    if (naverIdToken) {
      instance
        .post("/v1/auth/social-login", {
          social_type: "naver",
          access_token: naverIdToken,
        })
        .then((res) => {
          console.log(res);
          loginCheck(res);
        })
        .catch((err) => {
          console.log(err);
        });
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

  const onSubmit = (values) => {
    console.log("Form data", values);
    console.log("아이디", values.userId);

    instance
      .post("/v1/auth/login", {
        user_id: values.userId,
        user_password: values.userPassword,
      })
      .then(function (response) {
        loginCheck(response);
      })
      .catch(function (error) {
        console.log(error);
        alert("일치하는 회원이 없습니다.");
      });
  };

  function loginCheck(response) {
    localStorage.setItem("token", response.data);

    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    } else {
      window.location.replace("/mypage");
    }
  }

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: "50" },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const naverToken = location.hash.split("=")[1].split("&")[0];
    setNaverIdToken(naverToken);
  };

  const handleFindIdPassword = () => {
    alert("현재 서비스 준비 중입니다.");
  };

  const onSuccess = (response) => {
    console.log(response);

    instance
      .post("/v1/auth/social-login", {
        social_type: "google",
        profile: {
          id: response.profileObj.googleId,
          name: response.profileObj.name,
          email: response.profileObj.email,
        },
      })
      .then((res) => {
        console.log(res);
        loginCheck(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
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
                autoFocus
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
            <button type="submit" id="logInButton" className="login_btn">
              로그인
            </button>
            <BtnWrap>
              <div id="naverIdLogin" onClick={initializeNaverLogin}></div>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="구글 아이디로 로그인"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
              />
            </BtnWrap>
          </fieldset>

          <ul className="main_find_information">
            <li className="find_info_list" onClick={handleFindIdPassword}>
              아이디 찾기
            </li>
            <li className="find_info_list" onClick={handleFindIdPassword}>
              비밀번호 찾기
            </li>
            <li className="find_info_list">
              <Link to="/join" className="find_link">
                회원가입
              </Link>
            </li>
          </ul>
        </div>
      </Form>
    </Formik>
  );
};

export default LogIn;

const BtnWrap = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: center;

  & img {
    min-width: 200px;
    max-width: 200px;
  }

  & button {
    min-width: 200px;
    max-width: 200px;
    margin-top: 10px;
  }
`;
