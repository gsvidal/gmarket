import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import "./HomePage.scss";
import { useFetchProducts } from "../../hooks";
import { getAllProducts } from "../../services/public.service";
import { ProductList } from "../../components";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = () => {
  const { username } = useSelector((store: AppStore) => store.user);
  const { loading, errorMessage } = useFetchProducts(getAllProducts);
  const { allProducts } = useSelector((store: AppStore) => store.product);

  return (
    <>
      <h1 className="title homepage__title">Welcome {username && username}! </h1>
      <h2>You can find any products here:</h2>
      <ProductList
        products={allProducts}
        loading={loading}
        errorMessage={errorMessage}
      />
    </>
  );
};
