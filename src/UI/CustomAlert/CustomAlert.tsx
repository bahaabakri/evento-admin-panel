import { Alert, type DefaultMantineColor } from "@mantine/core";
interface CustomAlertProps {
  title: string;
  message: string;
  color: DefaultMantineColor;
  closable?: boolean;
  icon?: React.ReactNode;
}
const CustomAlert = ({
  title,
  message,
  color,
  closable,
  icon,
}: CustomAlertProps) => {
  return (
    <Alert
      variant="light"
      color={color}
      radius="lg"
      withCloseButton={closable}
      title={title}
      icon={icon}
    >
      {message}
    </Alert>
  );
}
export default CustomAlert;
