import { Alert, type DefaultMantineColor } from "@mantine/core";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";
interface CustomAlertProps {
  title: string;
  message: string;
  closable?: boolean;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}
const CustomAlert = ({
  onClose,
  title,
  message,
  type,
  closable,
}: CustomAlertProps) => {
    return (
        <Alert
        variant="light"
        color={type == 'error' ? 'red' : type == 'success' ? 'green' : 'blue' as DefaultMantineColor}
        radius="lg"
        withCloseButton={closable}
        onClose={onClose}
        title={title}
        icon={type == 'error' ? <IconInfoCircle /> : type == 'success' ? <IconCheck /> : <IconInfoCircle /> }
        >
        {message}
        </Alert>
    );
}
export default CustomAlert;
