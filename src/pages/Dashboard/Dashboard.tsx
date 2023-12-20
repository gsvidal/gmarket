import { useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { getSellerProducts } from "../../services/public.service";
import { AddProductForm, Button, Modal } from "../../components";
import { useFetchProducts } from "../../hooks";
import { ProductList } from "../../components";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newProductAdded, setNewProductAdded] = useState<boolean>(false);
  const user = useSelector((store: AppStore) => store.user);
  const { loading, errorMessage } = useFetchProducts(
    () => getSellerProducts(user.id, user.token),
    newProductAdded
  );
  const { sellerProducts } = useSelector((store: AppStore) => store.product);

  const handleAddProduct = () => {
    setNewProductAdded(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <h1 className="title dashboard__title">Seller Dashboard</h1>
      <Button onClick={handleAddProduct}>+ Add product</Button>
      <h3>These are your products:</h3>
      {isModalOpen && (
        <Modal>
          <AddProductForm
            setIsModalOpen={setIsModalOpen}
            setNewProductAdded={setNewProductAdded}
          />
        </Modal>
      )}
      <ProductList
        products={sellerProducts}
        loading={loading}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default Dashboard;
