import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

function SignUpForm() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("성공적으로 회원가입이 완료 되었습니다.");
    } catch (err: any) {
      toast.error(err?.code);
    }
  };
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
      const validRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력해 주세요.");
      } else {
        setError("");
      }
    }
    if (name === "password_confirmation") {
      setPasswordConfirmation(value);
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력해 주세요.");
      } else if (value !== password) {
        setError("비밀번호와 비밀번호 확인값이 다릅니다.");
      } else {
        setError("");
      }
    }
  };
  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <div className="form_title"></div>
      <div className="form_block">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          required
          onChange={onchange}
        />
      </div>
      <div className="form_block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onchange}
          required
        />
      </div>
      <div className="form_block">
        <label htmlFor="password_confirmation">비밀번호확인</label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={onchange}
          required
        />
      </div>
      {/* 만약 에러가 있다면 */}
      {error && error?.length > 0 && (
        <>
          <div className="form_block">
            <div className="form_error">{error}</div>
          </div>
          <div className="form_block">
            계정이 있으신가요?
            <Link to="login" className="form_link">
              로그인 하기
            </Link>
          </div>
        </>
      )}
      <div className="form_block">
        <button
          type="submit"
          className="form_btn-submit"
          disabled={error.length > 0}
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
