import { FormEvent, useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/states/user.slice";
import { createUserAdapter } from "../../adapters/user.adapter";
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { register } from "../../services/public.service";
import { Input } from "../../components";
import { useInput } from "../../hooks/useInput";

type RegisterProps = {};
export type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export const Register: React.FC<RegisterProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, callEndPoint } = useFetchAndLoad();

  const usernameData = useInput("");
  const passwordData = useInput("");
  const confirmPasswordData = useInput("");
  const roleData = useInput("");

  const formValues = {
    username: usernameData.value,
    password: passwordData.value,
    confirmPassword: confirmPasswordData.value,
    role: roleData.value,
  };

  const { username, password, confirmPassword, role } = formValues;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fieldsToValidate = [
      { field: username, message: "Username is required" },
      { field: password, message: "Password is required" },
      { field: confirmPassword, message: "Confirm password is required" },
      { field: role, message: "Role is required" },
    ];

    // Validate if there's an empty input
    for (const { field, message } of fieldsToValidate) {
      if (field.trim() === "") {
        setErrorMessage(message);
        return;
      }
    }

    // If all inputs are filled, validate password
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // if (password meets 1number, 1uppercase, 1symbol requirement)

    // If all validations pass, clear error message
    setErrorMessage("");

    // Trigger API Call using axios
    try {
      const data = await callEndPoint(register(formValues));
      dispatch(createUser(createUserAdapter(data)));
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form action="" onSubmit={handleSubmit}>
          <h1>Register Form</h1>
          <Input
            labelText="Username"
            type="text"
            placeholder="Username"
            name="username"
            autocomplete="username"
            {...usernameData}
          />
          <Input
            labelText="Password"
            type="password"
            placeholder="Password"
            name="password"
            autocomplete="new-password"
            {...passwordData}
          />
          <Input
            labelText="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autocomplete="new-password"
            {...confirmPasswordData}
          />
          <Input
            labelText="Seller"
            type="radio"
            name="role"
            checked={role === "Seller"}
            {...roleData}
          />
          <Input
            labelText="Customer"
            type="radio"
            name="role"
            checked={role === "Customer"}
            {...roleData}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button>Register</button>
        </form>
      )}
    </>
  );
};
