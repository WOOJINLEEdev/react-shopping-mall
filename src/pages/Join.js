import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {
  userId,
  userPassword,
  userPassword2,
  userName,
  userEmail,
  userMonth,
  userDate,
} from "utils/login-validation";
import { instance } from "utils/http-client";

const Join = () => {
  const ref = useRef(null);

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
    password2: userPassword2(),
    name: userName(),
    month: userMonth(),
    date: userDate(),
    email: userEmail(),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    console.log("이메일, 이름", values.email, values.name);

    instance
      .post("/v1/auth/join", {
        user_id: values.id,
        user_password: values.password2,
        name: values.name,
        email: values.email,
      })
      .then(function (response) {
        console.log(response);
        alert("회원가입이 완료되었습니다.");
        window.location.replace("/login");
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          alert("이미 입력한 ID가 존재합니다.");
        }
      });
  };

  const getMonthDateErrorMsg = ({ month, date }) => {
    const monthRequiredMsg = "월을 입력해주세요.";
    const dateRequiredMsg = "일을 입력해주세요.";

    if (month === monthRequiredMsg && date === dateRequiredMsg) {
      return <div className="input_check">월 및 일을 입력해주세요.</div>;
    }

    if (month) {
      return <div className="input_check">{month}</div>;
    }

    if (date) {
      return <div className="input_check">{date}</div>;
    }
  };

  const handleIdCheckBtn = () => {
    let userId = ref.current.values.id;

    if (!userId) {
      return;
    }

    if (userId.length < 4) {
      return;
    }

    instance.get(`v1/auth/check-user-id?user_id=${userId}`).then((res) => {
      console.log("id check", res.data);

      if (res.data) {
        return alert("이미 존재하는 ID 입니다. 다른 ID를 입력해주세요.");
      }

      alert("사용 가능한 ID 입니다.");
    });
  };

  return (
    <Formik
      innerRef={ref}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div className="join_wrapper">
            <div className="join">
              <h2 className="join_head">회원가입</h2>
              <label htmlFor="userId" className="form_label">
                아이디 (ID)
              </label>
              <Div>
                <Field
                  type="text"
                  className="form_input userId"
                  name="id"
                  id="userId"
                />
                <IdCheckBtn type="button" onClick={handleIdCheckBtn}>
                  중복체크
                </IdCheckBtn>
              </Div>
              <ErrorMessage name="id" component="div" className="input_check" />

              <label htmlFor="userPassword1" className="form_label">
                비밀번호 (Password)
              </label>
              <Field
                type="password"
                id="userPassword1"
                className="form_input"
                name="password1"
                autoComplete="off"
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
                id="userPassword2"
                className="form_input"
                name="password2"
                autoComplete="off"
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
              <ErrorMessage
                name="name"
                component="div"
                className="input_check"
              />

              <fieldset className="birth">
                <legend className="form_label">생일 (Birthday)</legend>
                <BirthWrap>
                  <label htmlFor="month" className="month_label">
                    월
                  </label>
                  <Field
                    type="number"
                    className="form_input month"
                    id="month"
                    name="month"
                    placeholder="월"
                    onChange={(e) =>
                      setFieldValue("month", e.target.value.substring(0, 2))
                    }
                  />

                  <span className="birth_text">-</span>

                  <label htmlFor="date" className="date_label">
                    일
                  </label>
                  <Field
                    type="number"
                    className="form_input date"
                    id="date"
                    name="date"
                    placeholder="일"
                    onChange={(e) =>
                      setFieldValue("date", e.target.value.substring(0, 2))
                    }
                  />
                </BirthWrap>
              </fieldset>
              {(errors.month && touched.month) || (errors.date && touched.date)
                ? getMonthDateErrorMsg(errors)
                : null}

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
      )}
    </Formik>
  );
};

export default Join;

const BirthWrap = styled.div`
  display: flex;
  font-size: 0;

  @media only screen and (min-width: 320px) and (max-width: 1023px) {
    & input {
      width: 30%;
      max-width: 100px;
    }
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    justify-content: flex-start;
  }
`;

const IdCheckBtn = styled.button`
  width: 20%;
  font-size: 14px;
  font-weight: bold;
  background-color: #fff;
  border: 2px solid rgb(95, 95, 95);
  border-radius: 3px;
  color: rgb(95, 95, 95);
  cursor: pointer;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 35%;
    min-width: 55px;
    max-width: 140px;
    font-size: 13px;
    margin-left: 10px;
  }
`;
