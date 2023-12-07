type ModalProps = {
  children: React.ReactNode
}

export const Modal = ({children}: ModalProps) : React.ReactNode  => {
  return(
    <>
    {children }
    </>
  );
}