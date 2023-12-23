import "./Modal.scss";

type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({ children }: ModalProps): React.ReactNode => {
  return <div className="modal">{children}</div>;
};
