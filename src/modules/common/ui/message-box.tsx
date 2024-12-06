import { ReactNode } from "react";
import { CloseIcon } from "../icons/close-icon";

export const MessageBox = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="text-white bg-[#B4B1B12B] flex gap-2 p-2 rounded justify-between">
      <div>{children}</div>

      <button className="self-start" onClick={onClose}>
        <CloseIcon className="text-[#555]" />
      </button>
    </div>
  );
};
