import { useEffect } from "react";
import "./Modal.scss";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps): React.ReactNode => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  return <div className="modal">{children}</div>;
};
