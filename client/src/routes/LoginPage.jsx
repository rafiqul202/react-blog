import { SignIn } from "@clerk/react";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center mx-auto">
      <SignIn signUpUrl="/register" />
    </div>
  );
};

export default LoginPage;
