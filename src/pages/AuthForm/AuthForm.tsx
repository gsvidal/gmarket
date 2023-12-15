import { FormEvent, useState } from "react";
import "./AuthForm.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/states/user.slice";
import { authUserAdapter } from "../../adapters";

import { login, register } from "../../services/public.service";
import { Input } from "../../components";
import { useFetchAndLoad, useInput } from "../../hooks";

type AuthFormProps = {
  title: "Login" | "Register";
};

export type FormValues = {
  username: string;
  password: string;
  confirmPassword?: string;
  role?: string;
};

export const AuthForm: React.FC<AuthFormProps> = ({ title }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, callEndPoint } = useFetchAndLoad();

  const usernameData = useInput("");
  const passwordData = useInput("");
  const confirmPasswordData = useInput("");
  const roleData = useInput("");

  const formValues: FormValues = {
    username: usernameData.value,
    password: passwordData.value,
    confirmPassword:
      title === "Register" ? confirmPasswordData.value : undefined,
    role: title === "Register" ? roleData.value : undefined,
  };

  const { username, password, confirmPassword, role } = formValues;

  const inputValidation = () => {
    setErrorMessage("");
    const fieldsToValidate = [
      { field: username, message: "Username is required" },
      { field: password, message: "Password is required" },
    ];

    if (title === "Register") {
      if (confirmPassword !== undefined && role !== undefined) {
        fieldsToValidate.push(
          { field: confirmPassword, message: "Confirm password is required" },
          { field: role, message: "Role is required" }
        );
      }
    }

    // Validate if there's an empty input
    for (const { field, message } of fieldsToValidate) {
      if (field.trim() === "") {
        setErrorMessage(message);
        return false;
      }
    }

    if (title === "Register") {
      // If all inputs are filled, validate password
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long");
        return false;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return false;
      }

      // if (password meets 1number, 1uppercase, 1symbol requirement)
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate inputs
    if (!inputValidation()) {
      return;
    }

    // Trigger API Call using axios
    try {
      const data = await callEndPoint(
        title === "Register" ? register(formValues) : login(formValues)
      );
      dispatch(authUser(authUserAdapter(data)));
      localStorage.setItem("user", JSON.stringify(authUserAdapter(data)));
      // TODO:
      // if(title === "Register") {
      //   // Toast("Registered successfully")
      // } else if(title === "Login") {
      //   // Toast("Logged in successfully")
      // }
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
          <h1>{title} Form</h1>
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
          {title === "Register" && (
            <>
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
            </>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button>{title}</button>
        </form>
      )}
    </>
  );
};
