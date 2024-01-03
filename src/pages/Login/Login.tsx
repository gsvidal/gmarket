import "./Login.scss";
import { AuthForm } from "..";

type LoginProps = {};

export const Login: React.FC<LoginProps> = () => {
  return <AuthForm title="Login" />;
};
