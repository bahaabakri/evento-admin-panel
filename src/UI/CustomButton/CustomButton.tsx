import type { ButtonHTMLAttributes, FC, ReactElement } from "react";
import { Button, type ButtonProps, Loader } from "@mantine/core";

interface CustomButtonProps
  extends ButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style"> {
  children: ReactElement | string;
  isPending?: boolean;
  isSecondButton?: boolean;
  isLinkDesign?: boolean;
  isWidthFull?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  isPending = false,
  isSecondButton = false,
  isLinkDesign = false,
  isWidthFull = false,
  ...buttonProps
}) => {
  const linkStyles = {
    backgroundColor: "transparent",
    color: "#228be6", // Mantine blue
    textDecoration: "underline",
    fontWeight: 500,
    padding: 0,
    height: "auto",
    minHeight: "unset",
    border: "none",
  } as const;

  return (
    <Button
      fullWidth={!!isWidthFull}
      variant={isLinkDesign ? "subtle" : "filled"}
      color={isLinkDesign ? undefined : isSecondButton ? "gray" : "roseRed"}
      style={isLinkDesign ? linkStyles : undefined}
      {...buttonProps}
    >
      <div className="flex gap-2 items-center justify-center">
        {children}
        {isPending && <Loader size={16} />}
      </div>
    </Button>
  );
};

export default CustomButton;
