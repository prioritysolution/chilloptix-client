"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import { Dispatch, FC, SetStateAction } from "react";

interface SuccessMessageProps {
  showSuccessMessage: boolean;
  setShowSuccessMessage: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
  showNextButton?: boolean;
  handleNextClick?: () => void;
  nextLabel?: string;
  closeLabel?: string;
}

const SuccessMessage: FC<SuccessMessageProps> = ({
  showSuccessMessage,
  setShowSuccessMessage,
  successMessage,
  showNextButton = true,
  handleNextClick,
  nextLabel = "Next",
  closeLabel = "Close",
}) => {
  return (
    <Modal
      isOpen={showSuccessMessage}
      onOpenChange={setShowSuccessMessage}
      backdrop="blur"
      size="lg"
      hideCloseButton
    >
      <ModalContent>
        <ModalBody>
          <p className="text-2xl font-medium py-5 text-center">
            {successMessage}
          </p>
          {showNextButton && (
            <p className="text-center text-xl">Want to generate PDF?</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => setShowSuccessMessage(false)}
            size="lg"
            radius="sm"
            className="w-32"
          >
            {closeLabel}
          </Button>
          {showNextButton && (
            <Button
              type="submit"
              color="primary"
              size="lg"
              radius="sm"
              className="w-32"
              onPress={handleNextClick}
            >
              {nextLabel}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SuccessMessage;
