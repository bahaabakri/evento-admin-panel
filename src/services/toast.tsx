import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export function showSuccessToast(message: string) {
  notifications.show({
    title: 'Success',
    message,
    color: 'green',
    icon: <IconCheck size={18} />,
    autoClose: 3000,
  });
}

export function showErrorToast(message: string) {
  notifications.show({
    title: 'Error',
    message,
    color: 'red',
    icon: <IconX size={18} />,
    autoClose: 3000,
  });
}