export type InputProps = {
  labelText: string;
  type: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  autocomplete?: string;
  checked?: boolean;
};

export const Input = ({
  labelText,
  type,
  placeholder,
  name,
  required,
  autocomplete,
  ...otherProps
}: InputProps) => {
  return (
    <div>
      <label htmlFor={labelText}>{labelText}:</label>
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
