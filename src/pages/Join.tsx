import { useRef } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikProps,
  FormikValues,
  FieldAttributes,
  FormikErrors,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import * as Sentry from "@sentry/react";

import useCheckUserId from "hooks/api/useCheckUserId";
import useHttpClient from "hooks/useHttpClient";
import {
  userId,
  userPassword,
  userPasswordCheck,
  userName,
  userEmail,
  userMonth,
  userDate,
} from "utils/login-validation";
import { SentryError } from "utils/error";
import { createJoinApi } from "api";

interface IValues {
  id: string;
  password1: string;
  password2: string;
  name: string;
  month: string;
  date: string;
  email: string;
}

const Join = () => {
  const formikRef = useRef<FormikProps<IValues>>(null);

  const instance = useHttpClient();

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
    password2: userPasswordCheck(),
    name: userName(),
    month: userMonth(),
    date: userDate(),
    email: userEmail(),
  });

  const handleFormSubmit = async (
    values: IValues,
    { setSubmitting }: FormikHelpers<IValues>,
  ) => {
    setSubmitting(true);
    try {
      await createJoinApi({
        instance,
        userId: values.id,
        userPassword: values.password2,
        name: values.name,
        email: values.email,
      });
      alert("회원가입이 완료되었습니다.");
      window.location.replace("/login");
    } catch (err: any) {
      Sentry.captureException(new SentryError(err as Error));
      if (err.response) {
        alert("이미 입력한 ID가 존재합니다.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getMonthDateErrorMsg = ({
    month,
    date,
  }: FormikErrors<FormikValues>) => {
    const monthRequiredMsg = "월을 입력해주세요.";
    const dateRequiredMsg = "일을 입력해주세요.";

    if (month === monthRequiredMsg && date === dateRequiredMsg) {
      return <div className="input_check">월 및 일을 입력해주세요.</div>;
    }

    if (month) {
      return <div className="input_check">{month as string}</div>;
    }

    if (date) {
      return <div className="input_check">{date as string}</div>;
    }
  };

  const { refetch } = useCheckUserId({
    userId: formikRef?.current?.values.id ?? "",
  });

  const handleIdCheckBtnClick = async () => {
    let userId = formikRef?.current?.values.id;

    if (!userId) {
      return;
    }

    if (userId.length < 4) {
      return;
    }

    refetch();
  };

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, setFieldValue, isSubmitting }) => (
        <Form>
          <div className="join_wrapper">
            <div className="join">
              <h2 className="join_head">회원가입</h2>
              <LabelWrap>
                <label htmlFor="userId" className="form_label">
                  아이디 (ID)
                </label>
                <span>4글자 이상</span>
              </LabelWrap>
              <Div>
                <Field
                  type="text"
                  className="form_input userId"
                  name="id"
                  id="userId"
                />
                <IdCheckBtn type="button" onClick={handleIdCheckBtnClick}>
                  중복체크
                </IdCheckBtn>
              </Div>
              <ErrorMessage name="id" component="div" className="input_check" />

              <LabelWrap>
                <label htmlFor="userPassword1" className="form_label">
                  비밀번호 (Password)
                </label>
                <span>영문 숫자 조합 8 ~ 16자리</span>
              </LabelWrap>
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

              <label htmlFor="userPasswordCheck" className="form_label">
                비밀번호 확인 (Password Confirm)
              </label>
              <Field
                type="password"
                id="userPasswordCheck"
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
                    onChange={(e: FieldAttributes<any>) =>
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
                    onChange={(e: FieldAttributes<any>) =>
                      setFieldValue("date", e.target.value.substring(0, 2))
                    }
                  />
                </BirthWrap>
              </fieldset>
              {(errors.month && touched.month) || (errors.date && touched.date)
                ? getMonthDateErrorMsg(errors)
                : null}

              <label htmlFor="email" className="form_label">
                이메일 (E-mail)
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form_input mail"
                placeholder="E-MAIL"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="input_check"
              />

              <button
                type="submit"
                className="join_btn"
                disabled={isSubmitting}
              >
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
    input {
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

const LabelWrap = styled.div`
  display: flex;

  span {
    font-size: 12px;
    color: #6d6d6d;
    line-height: 14px;
    margin-top: 20px;
    padding-bottom: 12px;
    margin-left: 10px;
  }

  @media only screen and (min-width: 320px) and (max-width: 359px) {
    flex-direction: column;

    .form_label {
      padding-bottom: 5px;
    }

    span {
      margin: 0;
      padding-left: 5px;
      padding-bottom: 5px;
    }
  }
`;
