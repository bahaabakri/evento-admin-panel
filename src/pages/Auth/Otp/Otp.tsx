import { useHttp } from "@/hooks/useHttp";
import CustomButton from "@/UI/CustomButton/CustomButton";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./Otp.module.scss";
import * as yup from "yup";
import AuthLayout from "../../../Layout/AuthLayout/AuthLayout";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import { VerifyOtpResponse } from "../auth.type";
import { useDispatch } from "react-redux";
import { setAuthenticatedUser } from "@/store/authSlice";
const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter valid email address"),
  otp: yup.string().required("Otp is required"),
});
const LoginRegister: React.FC = () => {
  const { loading: isVerifying, request: verifyRequest } = useHttp();
  const { loading: isResending, request: resendRequest } = useHttp();
  const {
    handleError: handleErrorLoginReg,
    handleSuccess: handleSuccessLoginReg,
  } = useHandleErrorSuccess();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<{ otp: string; email: string }>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      otp: "",
      email: "",
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    setValue("email", email || "");
  });
  const verify = async (formData: { otp: string; email: string }) => {
    const { data, error } = await verifyRequest<VerifyOtpResponse>(
      "post",
      "admin/auth/verify",
      formData
    );
    if (error || !data) {
      handleErrorLoginReg(error || "Something Went Wrong");
    } else {
      dispatch(
        setAuthenticatedUser({
          user: data.user,
          access_token: data.access_token,
        })
      );
      handleSuccessLoginReg(data.message || "Login Successfully", "/");
    }
  };

  const resendOtp = async () => {
    try {
      await resendRequest("post", "admin/auth/resend-otp", {
        email: getValues("email"),
      });
      handleSuccessLoginReg("OTP resent successfully");
    } catch (err) {
      handleErrorLoginReg(err.message);
    }
  };
  return (
    <AuthLayout
      onResendOtp={resendOtp}
      isPendingResendOtp={isResending}
      type="otp"
      title="Verify"
      subtitle="Please enter the code we just sent to your email address."
    >
      <form
        className={styles["login-reg-form"]}
        onSubmit={handleSubmit(verify)}
      >
        <div style={{ marginBottom: "1rem" }}>
          <Controller
            name="otp"
            control={control}
            render={({ field, fieldState }) => (
              <CustomTextField
                {...field}
                label="Otp"
                placeholder="Enter otp here"
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
          isPending={isVerifying}
          type="submit"
          disabled={!isValid || isVerifying}
        >
          <div>Verify</div>
        </CustomButton>
      </form>
    </AuthLayout>
  );
};

export default LoginRegister;
