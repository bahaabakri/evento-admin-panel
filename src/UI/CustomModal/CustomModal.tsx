// src/UI/CustomModal/CustomModal.tsx
import { Modal } from "@mantine/core";

interface CustomModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  size?: string | number;
  children: React.ReactNode;
}

const CustomModal = ({
  opened,
  onClose,
  title,
  size = "sm",
  children,
}: CustomModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      size={size}
      radius="md"
      overlayProps={{ backgroundOpacity: 0.3, blur: 3 }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
