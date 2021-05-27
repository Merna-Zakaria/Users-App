import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./login.module.css";
import { useState, useEffect } from "react";

const Login = () => {
  const router = useRouter();

  const [fieldValue, setFieldValue] = useState({ email: "", password: "" });

  const handelOnChange = (e, name) => {
    setFieldValue({ ...fieldValue, [name]: e.target.value });
  };

  const hadelSubmit = () => {
    if (fieldValue.email && fieldValue.password) {
      localStorage.setItem("user_data", JSON.stringify(fieldValue));
      router.push("/");
    } else {
      localStorage.removeItem("user_data");
    }
  };
  return (
    <div className={`login`}>
      <div>
        <div className={styles.login_logo}>
          <Image
            src="/next_logo.png"
            alt="next Logo"
            width={600}
            height={300}
          />
        </div>
        <h1 className={`title margin_20`}>Login</h1>
        <div className={`center`}>
          <div>
            <input
              placeholder="email"
              className="block margin_20"
              value={fieldValue.email}
              onChange={(e) => handelOnChange(e, "email")}
            ></input>
            <input
              placeholder="password"
              className="block margin_20"
              value={fieldValue.password}
              onChange={(e) => handelOnChange(e, "password")}
            ></input>
            <button
              className="block margin_20"
              disabled={!fieldValue.email || !fieldValue.password}
              onClick={hadelSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
