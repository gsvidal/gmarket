import './Input.scss'

export type InputProps = {
  labelText: string;
  type: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  autocomplete?: string;
  checked?: boolean;
  className?: string;
};

export const Input = ({
  labelText,
  type,
  placeholder,
  name,
  required,
  autocomplete,
  className,
  ...otherProps
}: InputProps) => {
  return (
    <div>
      <label className={className} htmlFor={labelText}>{labelText}:</label>
      <input
        id={labelText}
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        autoComplete={autocomplete}
        {...otherProps}
      />
    </div>
  );
};
