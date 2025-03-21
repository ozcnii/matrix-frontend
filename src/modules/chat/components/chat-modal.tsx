import { CloseIcon } from "@/modules/common/icons/close-icon";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

export const ChatModal = ({
  header,
  children,
  onClose,
}: {
  header: ReactNode;
  children: ReactNode;
  onClose: () => void;
}) => {
  return createPortal(
    <div className="fixed inset-0">
      <div
        className="fixed inset-0 backdrop-blur-[7px] z-10"
        onClick={onClose}
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 bg-black rounded w-5/6 p-4">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <CloseIcon className="text-[#555]" />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex justify-center  max-w-5/6 w-5/6 text-lg">
            {header}
          </div>

          <div className="mt-4 w-full flex flex-col items-center text-[#BEBEBE]">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
