import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  userId,
  userPassword,
  userName,
  userBirthDay,
  userEmail,
} from "./LogInValidation";

const Join = () => {
  const [items, setItems] = useState({
    id: "",
    password1: "",
    password2: "",
    name: "",
    birthDay: "",
    email: "",
  });

  const initialValues = {
    id: "",
    password1: "",
    password2: "",
    name: "",
    month: "",
    date: "",
    email: "",
  };

  const validationSchema = Yup.object({
    id: userId(),
    password1: userPassword(),
    password2: userPassword(),
    name: userName(),
    month: userBirthDay("월"),
    date: userBirthDay("일"),
    email: userEmail(),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    console.log("이메일, 이름", values.email, values.name);

    axios
      .post("http://localhost:8282/v1/auth/join", {
        user_id: values.id,
        user_password: values.password2,
        name: values.name,
        email: values.email,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMonthDateErrorMsg = ({ month, date }) => {
    if (month && date) {
      return "월 및 일을 입력해주세요.";
    }

    if (month) {
      return "월을 입력해주세요.";
    }

    if (date) {
      return "일을 입력해주세요.";
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="join_wrapper">
          <div className="join">
            <h2 className="join_head">회원가입</h2>
            <label htmlFor="userId" className="form_label">
              아이디 (ID)
            </label>
            <Field type="text" className="form_input" name="id" id="id" />
            <ErrorMessage name="id" component="div" className="input_check" />

            <label htmlFor="userPassword1" className="form_label">
              비밀번호 (Password)
            </label>
            <Field
              type="password"
              className="form_input"
              id="password1"
              name="password1"
            />
            <ErrorMessage
              name="password1"
              component="div"
              className="input_check"
            />

            <label htmlFor="userPassword2" className="form_label">
              비밀번호 확인 (Password Confirm)
            </label>
            <Field
              type="password"
              className="form_input"
              id="password2"
              name="password2"
            />
            <ErrorMessage
              name="password2"
              component="div"
              className="input_check"
            />

            <label htmlFor="name" className="form_label">
              이름 (Name)
            </label>
            <Field type="text" className="form_input" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="input_check" />

            <fieldset className="birth">
              <legend className="form_label">생일 (Birthday)</legend>
              <label htmlFor="month" className="month_label">
                월
              </label>
              <Field
                type="text"
                className="form_input month"
                id="month"
                name="month"
                placeholder="월"
              />

              <span className="birth_text">-</span>

              <label htmlFor="date" className="date_label">
                일
              </label>
              <Field
                type="text"
                className="form_input date"
                id="date"
                name="date"
                placeholder="일"
              />
            </fieldset>
            <ErrorMessage
              name="month"
              component="div"
              className="input_check"
            />
            <ErrorMessage name="date" component="div" className="input_check" />

            <fieldset className="email">
              <legend className="form_label">이메일 (E-mail)</legend>
              <div className="email_box">
                <label htmlFor="email"></label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form_input mail"
                  placeholder="E-MAIL"
                />
              </div>
            </fieldset>
            <ErrorMessage
              name="email"
              component="div"
              className="input_check"
            />

            <button type="submit" className="join_btn" id="joinBtn">
              가입하기
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Join;
