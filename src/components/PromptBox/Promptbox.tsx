import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { triggerCancel, triggerOkay } from "@/redux/slices/promptSlice";
import Appbutton from "../Appbutton/Appbutton";

interface PromptBoxProps {
  title: string;
  isVisible: boolean;
  onOkay?: () => void;
  onCancel?: () => void;
}

const PromptBox: React.FC<PromptBoxProps> = ({
  title,
  isVisible,
  onOkay,
  onCancel,
}) => {
  const dispatch = useAppDispatch();

  if (!isVisible) return null;

  // Close modal via escape key
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      dispatch(triggerCancel());
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="modal-overlay rounded-lg">
      <div className="modal-box flex flex-col space-x-4">
        <h3>{title}</h3>
        <div className="mt-8 flex  w-full items-center justify-evenly ">
          <Appbutton
            label="YES"
            bgColor="#f00"
            onClick={onOkay || (() => dispatch(triggerOkay()))}
          />

          <Appbutton
            label="CANCEL"
            bgColor="#125"
            onClick={onCancel || (() => dispatch(triggerCancel()))}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
