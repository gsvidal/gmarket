import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import "./HomePage.scss";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = () => {
  const { username } = useSelector((store: AppStore) => store.user)

  return (
    <>
      <h1>Welcome {username && username}! </h1>
      <h2>Where you can find any products here</h2>
    </>
  );
};
