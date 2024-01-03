import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { getSellerProducts } from "../../services/public.service";
import { ProductForm, Button, Modal, ProductsPerPageFilter } from "../../components";
import { useFetchProducts } from "../../hooks";
import { ProductList } from "../../components";

const Dashboard = () => {
  const [productsPerPage, setProductsPerPage] = useState<number>(10);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const user = useSelector((store: AppStore) => store.user);
  const { loading, errorMessage, totalPages, currentPage, changePage } =
    useFetchProducts(() =>
      getSellerProducts(user.id, user.token, 1, productsPerPage)
    );
  const { sellerProducts } = useSelector((store: AppStore) => store.product);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const [localTotalPages, setLocalTotalPages] = useState<number>(totalPages);

  // Update localTotalPages when productsPerPage changes
  useEffect(() => {
    setLocalTotalPages(Math.ceil(sellerProducts.length / productsPerPage));
  }, [sellerProducts, productsPerPage]);

  return (
    <>
      <h1 className="title dashboard__title">Seller Dashboard</h1>
      <Button onClick={handleAddProduct}>+ Add product</Button>
      <h3>These are your products:</h3>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ProductForm setIsModalOpen={setIsModalOpen} type="create" />
        </Modal>
      )}
      <ProductsPerPageFilter setProductsPerPage={setProductsPerPage} />

      <ProductList
        products={sellerProducts}
        loading={loading}
        errorMessage={errorMessage}
        totalPages={localTotalPages}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        onChangePage={changePage}
      />
    </>
  );
};

export default Dashboard;
