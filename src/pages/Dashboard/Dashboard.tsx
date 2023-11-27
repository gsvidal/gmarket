import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

export const Dashboard = () => {
  const user = useSelector((store: AppStore) => store.user);

  return (
    <>
      <h1>Dashboard</h1>
      <h2>This is your info:</h2>
      <ul>
        <li>{user.id}</li>
        <li>{user.username}</li>
        <li>{user.role}</li>
        <li>{user.creationDate}</li>
      </ul>
    </>
  );
};
