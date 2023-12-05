import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useEffect, useState } from "react";
import { Product } from "../../models";
import { useFetchAndLoad } from "../../hooks";
import { getSellerProducts } from "../../services/public.service";

const Dashboard = () => {
  const user = useSelector((store: AppStore) => store.user);

  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const { loading, callEndPoint } = useFetchAndLoad();

  useEffect(() => {
    const fetchSellerProducts = async () => {
      const response = await callEndPoint(
        getSellerProducts(user.id, user.token)
      );
      const data = await response.data;
      setSellerProducts(data.products);
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
        ) : sellerProducts.length === 0 ? (
          <li>List is empty</li>
        ) : (
          sellerProducts.map((sellerProduct) => (
            <li>{JSON.stringify(sellerProduct)}</li>
          ))
        )}
      </ul>
    </>
  );
};

export default Dashboard