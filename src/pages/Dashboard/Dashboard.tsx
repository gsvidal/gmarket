import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { Product } from "../../models";
import { useFetchAndLoad } from "../../hooks";
import { getSellerProducts } from "../../services/public.service";
import { AddProductForm, Modal } from "../../components";

const Dashboard = () => {
  const user = useSelector((store: AppStore) => store.user);

  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const { loading, callEndPoint } = useFetchAndLoad();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await callEndPoint(
          getSellerProducts(user.id, user.token)
        );
        const data = await response.data;
        setSellerProducts(data.products);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };
    fetchSellerProducts();
  }, []);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <h1>Seller Dashboard</h1>
      <h2>These are your products:</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleAddProduct}>Add product</button>
      {isModalOpen && (
        <Modal>
          <AddProductForm />
        </Modal>
      )}
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

export default Dashboard;
