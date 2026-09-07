import { SignUp } from "@clerk/react";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="h-screen flex items-center justify-center backdrop-blur-md">
      <SignUp signInUrl="/login" />
    </div>
  );
};

export default RegisterPage;
