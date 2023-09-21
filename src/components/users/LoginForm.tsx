import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

function LoginForm() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("성공적으로 로그인이 완료 되었습니다.");
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
  };
  const onClickSocialLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const {
      currentTarget: { name },
    } = e;
    let provider;
    const auth = getAuth(app);

    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(
      auth,
      provider as GithubAuthProvider | GoogleAuthProvider
    )
      .then((result) => {
        toast.success("로그인 되었습니다.");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error?.message;
        toast.error(errorMessage);
      });
  };
  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <div className="form_title">
        <h1>로그인</h1>
      </div>
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

      <>
        <div className="form_block">
          <div className="form_error">{error}</div>
        </div>
        <div className="form_block-lg">
          계정이 없으신가요?
          <Link to="/users/signup" className="form_link">
            회원가입 하기
          </Link>
        </div>
      </>

      <div className="form_block-lg">
        <button
          type="submit"
          className="form_btn-submit"
          disabled={error.length > 0}
        >
          로그인
        </button>
      </div>
      <div className="form_block">
        <button
          name="google"
          type="button"
          className="form_btn-google"
          disabled={error.length > 0}
          onClick={onClickSocialLogin}
        >
          Google로 로그인
        </button>
      </div>
      <div className="form_block">
        <button
          name="github"
          type="button"
          className="form_btn-github"
          disabled={error.length > 0}
          onClick={onClickSocialLogin}
        >
          Github로 로그인
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
