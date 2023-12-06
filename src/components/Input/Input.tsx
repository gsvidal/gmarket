export type InputProps = {
  labelText: string;
  type: string;
  placeholder?: string;
  name: string;
  autocomplete?: string;
  checked?: boolean;
};

export const Input = ({
  labelText,
  type,
  placeholder,
  name,
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
        autoComplete={autocomplete}
        {...otherProps}
      />
    </div>
  );
};
