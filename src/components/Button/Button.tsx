import "./Button.scss";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export const Button = ({
  children,
  disabled,
  className,
  onClick,
}: ButtonProps): React.ReactNode => {
  return (
    <div className="button__container">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`button ${className ? className : ""}`}
      >
        {children}
      </button>
    </div>
  );
};
