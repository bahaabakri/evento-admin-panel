import CustomButton from "@/UI/CustomButton/CustomButton";
import { useModals } from "@mantine/modals";
import { ReactNode } from "react";

export function useLockedModal() {
  const modals = useModals();

  const closeLockedModal = () => modals.closeAll();

  const openLockedModal = ({
    title,
    content,
    onConfirm,
    confirmLabel = "Logout",
    color = "red",
  }: {
    title: string;
    content: ReactNode;
    onConfirm: () => void;
    confirmLabel?: string;
    color?: string;
  }) => {
    modals.openModal({
      title,
      centered: true,
      withCloseButton: false, // hides the (x) close button
      closeOnClickOutside: false, // disable closing by clicking outside
      closeOnEscape: false, // disable closing with ESC
      children: (
        <div className="flex flex-col gap-4">
          <div>{content}</div>
          <CustomButton
            onClick={onConfirm}
            color={color}
          >
            <div>{confirmLabel}</div>
          </CustomButton>
        </div>
      ),
    });
  };

  return { openLockedModal, closeLockedModal };
}
