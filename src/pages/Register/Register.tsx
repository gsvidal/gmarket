import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./Register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RegisterProps = {};

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export const Register: React.FC<RegisterProps> = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userSuccessMessage, setUserSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { username, password, confirmPassword, role } = formValues;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: name === "role" ? id : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    // If all inputs are filled, validate:
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // if (password meets 1number, 1uppercase, 1symbol requirement)

    setErrorMessage("");
    setUserSuccessMessage("");
    // Trigger API Call using axios
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      const postData = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/register",
            formValues,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.data;
          setUserSuccessMessage(data.message);
          navigate("/dashboard");
        } catch (error: any) {
          setErrorMessage(error.response?.data.error);
        } finally {
          setIsLoading(false);
        }
      };
      postData();
    }
  }, [isLoading]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://127.0.0.1:8000/");
  //       console.log(response);
  //       const data = await response.data
  //       console.log(data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form action="" onSubmit={handleSubmit}>
          <h1>Register Form</h1>
          {userSuccessMessage && <p>{userSuccessMessage}</p>}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={handleChange}
          />
          <label htmlFor="password">Confirm password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleChange}
          />
          <label htmlFor="seller">Seller</label>
          <input
            type="radio"
            id="seller"
            name="role"
            onChange={handleChange}
            checked={role === "seller"}
          />
          <label htmlFor="customer">Customer</label>
          <input
            type="radio"
            id="customer"
            name="role"
            onChange={handleChange}
            checked={role === "customer"}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button>Register</button>
        </form>
      )}
    </>
  );
};
