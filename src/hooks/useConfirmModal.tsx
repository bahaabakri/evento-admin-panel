
import { useModals } from '@mantine/modals';

export function useConfirmModal() {
  const modals = useModals();

  const openConfirmModal = ({
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    onConfirm,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    color = 'red',
  }: {
    title?: string;
    message?: string;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    color?: string;
  }) => {
    modals.openConfirmModal({
      title,
      centered: true,
      children: message,
      labels: { confirm: confirmLabel, cancel: cancelLabel },
      confirmProps: { color },
      onConfirm,
    });
  };

  return { openConfirmModal };
}