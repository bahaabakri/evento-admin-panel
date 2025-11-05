// src/features/Admins/components/RejectAdminModal.tsx
import { useState } from "react";
import CustomModal from "@/UI/CustomModal/CustomModal";
import CustomTextarea from "@/UI/CustomTextArea/CustomTextArea";
import CustomButton from "@/UI/CustomButton/CustomButton";

interface RejectAdminModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  loading?: boolean;
}

const RejectAdminModal = ({
  opened,
  onClose,
  onSubmit,
  loading = false,
}: RejectAdminModalProps) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onSubmit(reason.trim());
    setReason("");
  };

  return (
    <CustomModal opened={opened} onClose={onClose} title="Reject Admin">
      <div className="flex flex-col gap-4">
        <CustomTextarea
          label="Reason for rejection"
          placeholder="Enter your reason..."
          minRows={3}
          value={reason}
          onChange={(e) => setReason(e.currentTarget.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <CustomButton isSecondButton variant="default" onClick={onClose}>
            Cancel
          </CustomButton>
          <CustomButton  onClick={handleSubmit} disabled={!reason.trim()} isPending={loading}>
            Reject
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default RejectAdminModal;
