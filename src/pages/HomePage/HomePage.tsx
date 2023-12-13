import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import "./HomePage.scss";
import { useFetchProducts } from "../../hooks";
import { getAllProducts } from "../../services/public.service";
import { ProductList } from "../../components";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = () => {
  const { username } = useSelector((store: AppStore) => store.user)
  const {products, loading, errorMessage} = useFetchProducts(getAllProducts);

  return (
    <>
      <h1>Welcome {username && username}! </h1>
      <h2>Where you can find any products here</h2>
      <ProductList products={products} loading={loading} errorMessage={errorMessage}/>
    </>
  );
};
