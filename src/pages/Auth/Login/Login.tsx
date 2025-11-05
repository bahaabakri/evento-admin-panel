import { useHttp } from "@/hooks/useHttp";
import CustomButton from "@/UI/CustomButton/CustomButton";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import * as yup from "yup";
import AuthLayout from "../../../Layout/AuthLayout/AuthLayout";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import { MyResponse } from "@/types/response.type.";
import { User } from "@/types/user.type";
const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
const Login: React.FC = () => {
  const { loading: isPending, request } = useHttp();
  const {
    handleError: handleErrorLogin,
    handleSuccess: handleSuccessLogin,
  } = useHandleErrorSuccess();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const login = async (formData: { email: string }) => {
    const { data, error } = await request<MyResponse<User, 'user'>>("post", "admin/auth/login", formData);
    if (error) {
      handleErrorLogin(error);
    } else {
      handleSuccessLogin(
        data?.message || "Otp has been sent successfully",
        `/auth/otp?email=${formData.email}`
      );
    }
  };
  return (
    <AuthLayout
      type="login"
      title="Login"
      subtitle="Login to access your account."
    >
      <form className={styles["login-form"]} onSubmit={handleSubmit(login)}>
        <div style={{ marginBottom: "1rem" }}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <CustomTextField
                {...field}
                label="Email"
                placeholder="Enter Email address"
                errorMessage={
                  fieldState.isTouched && fieldState.error
                    ? fieldState.error.message
                    : ""
                }
              />
            )}
          />
        </div>
        <CustomButton
          isPending={isPending}
          type="submit"
          disabled={!isValid || isPending}
        >
          <div>Login</div>
        </CustomButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
