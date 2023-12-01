import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";

export const Dashboard = () => {
  const user = useSelector((store: AppStore) => store.user);

  const [dataBack, setDataBack] = useState<string>("");

  useEffect(() => {
    const fetchSellerProducts = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/seller_dashboard",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${user.token}`,
          },
        }
      );
      const data = await response.data;
      setDataBack(data.message);
    };
    fetchSellerProducts();
  }, []);

  useEffect(() => {
    console.log("tokenn in dash: ", user.token)
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
      <button>Logout</button>
      <p>Message from back: {dataBack}</p>
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
