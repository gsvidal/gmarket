import { useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { getSellerProducts } from "../../services/public.service";
import { AddProductForm, Modal } from "../../components";
import { useFetchProducts } from "../../hooks";
import { ProductList } from '../../components'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newProductAdded, setNewProductAdded] = useState<boolean>(false);
  const user = useSelector((store: AppStore) => store.user);
  const {products, loading, errorMessage} = useFetchProducts(() => getSellerProducts(user.id, user.token), newProductAdded)

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <h1>Seller Dashboard</h1>
      <h2>These are your products:</h2>
      <button onClick={handleAddProduct}>Add product</button>
      {isModalOpen && (
        <Modal>
          <AddProductForm
            setIsModalOpen={setIsModalOpen}
            setNewProductAdded={setNewProductAdded}
          />
        </Modal>
      )}
      <ProductList products={products} loading={loading} errorMessage={errorMessage}/>
    </>
  );
};

export default Dashboard;
