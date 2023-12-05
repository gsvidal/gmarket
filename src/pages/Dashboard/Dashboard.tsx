import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useEffect, useState } from "react";
import { Product } from "../../models";
import { useFetchAndLoad } from "../../hooks";
import { getSellerProducts } from "../../services/public.service";

export const Dashboard = () => {
  const user = useSelector((store: AppStore) => store.user);

  const [products, setProducts] = useState<Product[]>([]);
  const { loading, callEndPoint } = useFetchAndLoad();

  useEffect(() => {
    const fetchSellerProducts = async () => {
      const response = await callEndPoint(getSellerProducts(user.id, user.token));
      const data = await response.data;
      setProducts(data.products);
    };
    fetchSellerProducts();
  }, []);

  useEffect(() => {
    console.log("tokenn in dash: ", user.token);
  }, []);

  return (
    <>
      <h1>Seller Dashboard</h1>
      <h2>These are your products:</h2>
      {/* <button>Add product</button> */}
      <ul>
        {loading ? (
          "Loading..."
        ) : (
          <li>
            {products.map((product) => (
              <li>{JSON.stringify(product)}</li>
            ))}
          </li>
        )}
      </ul>
    </>
  );
};
