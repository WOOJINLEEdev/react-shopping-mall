import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
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

  const history = useHistory();

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

  const handleJoinBtn = () => {
    history.push("/join");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
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
              <SocialBtnWrap>
                <div
                  id="naverIdLogin"
                  onClick={initializeNaverLogin}
                  role="button"
                ></div>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="구글 아이디로 로그인"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </SocialBtnWrap>

              <JoinBtn type="button" onClick={handleJoinBtn}>
                회원가입
              </JoinBtn>
            </BtnWrap>
          </fieldset>
        </div>
      </Form>
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

  & button {
    min-width: 200px;
    max-width: 200px;
  }

  & img {
    min-width: 200px;
    max-width: 200px;
  }

  @media only screen and (min-width: 320px) and (max-width: 600px) {
    justify-content: space-evenly;
    height: 120px;

    & button {
      margin: 0 auto;
    }
  }
`;

const JoinBtn = styled.button`
  width: 45%;
  height: 100%;
  margin: 0;
  border: 2px solid #d4d4d4;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;

  @media only screen and (min-width: 320px) and (max-width: 600px) {
    width: 200px;
    height: 50px;
    margin: 0 auto;
  }
`;
