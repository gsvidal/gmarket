import "./Register.scss";

type RegisterProps = {};

export const Register: React.FC<RegisterProps> = () => {
  return (
    <>
      <form action="">
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder="Username" />
        <label htmlFor="username">Password:</label>
        <input type="password" placeholder="Password" />
        <label htmlFor="username">Confirm password:</label>
        <input type="password" placeholder="Confirm Password" />
        <label htmlFor="seller">Seller</label>
        <input type="radio" id="seller"/>
        <label htmlFor="customer">Customer</label>
        <input type="radio" id="customer"/>
      </form>
    </>
  );
};
