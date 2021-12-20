import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { userId, userPassword } from "utils/login-validation";
import { instance } from "utils/http-client";

const LogIn = () => {
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
        localStorage.setItem("token", response.data);

        const token = localStorage.getItem("token");
        if (!token) {
          return false;
        } else {
          window.location.replace("/mypage");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("일치하는 회원이 없습니다.");
      });
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
          </fieldset>

          <ul className="main_find_information">
            <li className="find_info_list">
              <Link to={"/login"} className="find_link">
                아이디 찾기
              </Link>
            </li>
            <li className="find_info_list">
              <Link to={"/login"} className="find_link">
                비밀번호 찾기
              </Link>
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
