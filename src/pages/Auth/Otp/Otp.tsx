import { useHttp } from "@/hooks/useHttp";
import CustomButton from "@/UI/CustomButton/CustomButton";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./Otp.module.scss"
import * as yup from "yup";
import AuthLayout from "../AuthLayout/AuthLayout";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
const schema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Enter valid email address"),
    otp: yup.string().required("Otp is required")
});
const LoginRegister: React.FC = () => {
    const { loading: isPending, request } = useHttp();
    const { alert, handleError: handleErrorLoginReg, handleSuccess: handleSuccessLoginReg, setAlert } = useHandleErrorSuccess()
    const {
        control,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<{ otp: string, email: string }>({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            otp: "",
            email: ""
        },
    });
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get("email");
        setValue("email", email || "");
    });
    const verify = async (formData: { otp: string }) => {
        try {
            await request("post", "admin/auth/verify", formData);
            handleSuccessLoginReg("Login Successfully", '/');
        } catch (err) {
            handleErrorLoginReg(err.message);
        }
    };
    return (
        <AuthLayout
            alert={alert}
            setAlert={setAlert}
            title="Verify"
            subtitle="Please enter the code we just sent to your email address.">
            <form
                className={styles['login-reg-form']}
                onSubmit={handleSubmit(verify)}>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="email">Email:</label>
                    <Controller
                        name="otp"
                        control={control}
                        render={({ field, fieldState }) => (
                            <CustomTextField
                                {...field}
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
                    isPending={isPending}
                    type="submit"
                    disabled={!isValid || isPending}
                >
                    <div>Verify</div>
                </CustomButton>
            </form>
        </AuthLayout>

    );
};

export default LoginRegister;
