import AccountInput from "../components/AccountInput";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";
import { Flip, ToastContainer, toast } from "react-toastify";
import { getDatabase, onValue, ref } from "firebase/database";

export default function Login() {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({});

  const validate = function (email, password) {
    const errors = {};
    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    email
      ? emailRegEx.test(email)
        ? null
        : (errors.email = "⛔ Invalid email address")
      : (errors.email = "⛔ Email is required");

    password
      ? passwordRegEx.test(password)
        ? null
        : (errors.password =
            "⛔ Password requirement (min. length 8, (A-Z), (a-z), (0-9))")
      : (errors.password = "⛔ Password is required");

    return errors;
  };

  const handleLogin = function (e) {
    e.preventDefault();
    setErrors(validate(loginInfo.email, loginInfo.password));

    !Object.keys(validate(loginInfo.email, loginInfo.password)).length &&
      signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
        .then((userCredential) => {
          onValue(ref(db, "users/" + userCredential.user.uid), (snapshot) => {
            dispatch(
              userLoginInfo({
                ...userCredential.user,
                coverImg: snapshot.val().coverImg,
              }),
            );
            localStorage.setItem(
              "userLoginInfo",
              JSON.stringify({
                ...userCredential.user,
                coverImg: snapshot.val().coverImg,
              }),
            );
          });

          setLoginInfo({ email: "", password: "" });
          navigate("/");
        })
        .catch((error) => {
          setLoginInfo({ email: "", password: "" });
          error.code.includes("auth/invalid-credential") &&
            toast.error("Invalid email and password combination");
        });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-login-img bg-cover bg-center bg-no-repeat">
      <ToastContainer
        transition={Flip}
        theme="colored"
        hideProgressBar
        autoClose={1000}
        position="top-center"
      />
      <div className="rounded-lg bg-black/30 p-16 shadow-[16px_16px_20px_0_rgba(0,0,0,0.4)] backdrop-blur-lg">
        <h1 className="mb-5 text-center text-5xl font-light uppercase text-white">
          Login
        </h1>
        <form
          noValidate
          className="flex w-[350px] flex-col gap-y-10"
          onSubmit={(e) => handleLogin(e)}
        >
          <div>
            <AccountInput
              id="email"
              label={<MdEmail />}
              type="email"
              placeholder="Email"
              value={loginInfo.email}
              onChange={(e) => {
                setLoginInfo((cur) => ({ ...cur, email: e.target.value }));
                setErrors((cur) => ({ ...cur, email: "" }));
              }}
            />
            <p className="mt-1 h-[1rem] font-medium text-white">
              {errors.email}
            </p>
          </div>
          <div>
            <AccountInput
              id="password"
              label={<FaLock />}
              placeholder="Password"
              type="password"
              value={loginInfo.password}
              onChange={(e) => {
                setLoginInfo((cur) => ({ ...cur, password: e.target.value }));
                setErrors((cur) => ({ ...cur, password: "" }));
              }}
            />
            <p className="mt-1 h-[1rem] font-medium text-white">
              {errors.password}
            </p>
          </div>
          <button
            type="submit"
            className="rounded-full bg-green-500 py-3 text-lg font-medium text-white duration-200 hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-2 text-center text-lg text-white">
          <p>
            Don&apos;t have an account ?{" "}
            <Link
              to="/registration"
              className="font-medium text-blue-300 duration-150 hover:text-blue-400"
            >
              Sign up
            </Link>
          </p>
          <p>
            <Link
              to="/forgotpassword"
              className="font-medium text-green-400 duration-150 hover:text-green-500"
            >
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
