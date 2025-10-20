import { useHttp } from "@/hooks/useHttp";
import CustomButton from "@/UI/CustomButton/CustomButton";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./Register.module.scss"
import * as yup from "yup";
import AuthLayout from "../AuthLayout/AuthLayout";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { RegisterPayload } from "../../../types/auth.type";
import CustomPhoneField from "@/UI/CustomPhoneField/CustomPhoneField";
const schema = yup.object({
    firstname: yup
        .string()
        .min(2, "Firstname must be at least 2 characters")
        .required("Firstname is required"),
    lastname: yup
        .string()
        .min(2, "Lastname must be at least 2 characters")
        .required("Lastname is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    phone: yup
        .string()
        .required("Phone number is required")
        .test("is-valid-phone", "Phone number is not valid", (value) => {
        if (!value) return false;
        // Parse without specifying a default region for international support
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber?.isValid() ?? false;
        }),
});
const Login: React.FC = () => {
    const { loading: isPending, request } = useHttp();
    const { handleError: handleErrorLoginReg, handleSuccess: handleSuccessLoginReg } = useHandleErrorSuccess()
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<RegisterPayload>({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
        },
    });
    const register = async (formData: RegisterPayload) => {
        try {
            await request("post", "admin/auth/register", formData);
            handleSuccessLoginReg("Otp has been sent successfully", `/auth/otp?email=${formData.email}`);
        }
        catch (err) {
            // handle error
            handleErrorLoginReg(err?.message || 'Something went wrong');
        }
    };
    return (
        <AuthLayout
            type="register"
            title="Register"
            subtitle="Become a member by registering as an admin.">
            <form
                className={styles['reg-form']}
                onSubmit={handleSubmit(register)}>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="firstname">Firstname:</label>
                    <Controller
                        name="firstname"
                        control={control}
                        render={({ field, fieldState }) => (
                            <CustomTextField
                                {...field}
                                placeholder="Enter First Name"
                                errorMessage={
                                    fieldState.isTouched && fieldState.error
                                        ? fieldState.error.message
                                        : ""
                                }
                            />
                        )}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="lastname">Lastname:</label>
                    <Controller
                        name="lastname"
                        control={control}
                        render={({ field, fieldState }) => (
                            <CustomTextField
                                {...field}
                                placeholder="Enter Last Name"
                                errorMessage={
                                    fieldState.isTouched && fieldState.error
                                        ? fieldState.error.message
                                        : ""
                                }
                            />
                        )}
                    />
                </div>
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
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="phone">Phone:</label>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <CustomPhoneField
                                {...field}
                                placeholder="Enter Phone Number"
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
                    <div>Register</div>
                </CustomButton>
            </form>
        </AuthLayout>

    );
};

export default Login;