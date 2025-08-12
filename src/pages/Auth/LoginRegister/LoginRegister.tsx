import { useHttp } from "@/hooks/useHttp";
import CustomButton from "@/UI/CustomButton/CustomButton";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./LoginRegister.module.scss"
import * as yup from "yup";
import AuthLayout from "../AuthLayout/AuthLayout";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
const LoginRegister: React.FC = () => {
  const { loading: isPending,  request } = useHttp();
  const { alert, handleError: handleErrorLoginReg, handleSuccess: handleSuccessLoginReg, setAlert } = useHandleErrorSuccess()
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
  const loginRegister = async (formData: { email: string }) => {
    try {
      await request("post", "admin/auth/loginRegister", formData);
      handleSuccessLoginReg("Otp has been sent successfully", `/auth/otp?email=${formData.email}`);
    }
    catch(err) {
      // handle error
      handleErrorLoginReg(err?.message || 'Something went wrong');
    }
  };
  return (
    <AuthLayout
      alert={alert}
      setAlert={setAlert}
      title="Login or Register"
      subtitle="Become a member by registering with your email address, or log in to access your account.">
      <form
        className={styles['login-reg-form']}
        onSubmit={handleSubmit(loginRegister)}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <CustomTextField
                {...field}
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
          <div>Login / Register</div>
        </CustomButton>
      </form>
    </AuthLayout>

  );
};

export default LoginRegister;
