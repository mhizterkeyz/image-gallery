"use client";
import { signIn, useSession } from "next-auth/react";
import { Input } from "@/components/input/input";
import styles from "./page.module.css";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignIn({ searchParams }) {
  const { data: session } = useSession();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  if (session) {
    return redirect("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("credentials", credentials);
  };

  let hasError = !!searchParams.error;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {hasError && (
          <center style={{ marginBottom: "25px" }}>Invalid Credentials</center>
        )}
        <span className={styles.title}>SIGNIN</span>

        <form action="" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="username"
            value={credentials.username}
            required
          />
          <div style={{ marginBottom: "16px" }}></div>

          <Input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={credentials.password}
            required
          />
          <div style={{ marginBottom: "25px" }}></div>

          <button className={styles.button}>LOGIN</button>
        </form>
      </div>
    </div>
  );
}
