import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { Input } from "..";
import { useFetchAndLoad, useInput } from "../../hooks";
import { createProduct, getCategories } from "../../services/public.service";
import { Category, Seller } from "../../models";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

export type productFormValues = {
  name: string;
  description: string;
  price: string;
  stock: string;
  image: string;
  category: string;
  seller: Seller;
};

export const AddProductForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { loading, callEndPoint } = useFetchAndLoad();
  const user = useSelector((store: AppStore) => store.user);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "no-category"
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const productNameData = useInput("");
  const productDescriptionData = useInput("");
  const productPriceData = useInput("");
  const productStockData = useInput("");
  const productImageData = useInput("");

  // const inputValidation = () => {
  //   setErrorMessage("");
  //   const fieldsToValidate = [
  //     { field: productName, message: "Name is required" },
  //     { field: productDescription, message: "Description is required" },
  //     { field: productPrice, message: "Description is required" },
  //     { field: productStock, message: "Description is required" },
  //   ];
  // }

  const formValues: productFormValues = {
    name: productNameData.value,
    description: productDescriptionData.value,
    price: productPriceData.value,
    stock: productStockData.value,
    image: productImageData.value,
    category: selectedCategory,
    seller: { id: user.id, username: user.username },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await callEndPoint(getCategories(user.token));
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check if the selected category code exists in the fetched categories
    const selectedCategoryExists = categories.some(
      (category) => category.code === formValues.category
    );
    if (!selectedCategoryExists) {
      setErrorMessage("Please select a valid category.");
      return;
    }
    console.log("submitted");

    const postProduct = async () => {
      try {
        const response = callEndPoint(createProduct(formValues, user.token));
        console.log(response);
      } catch (error: any) {
        setErrorMessage(error);
      }
    };
    postProduct();
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <Input
        labelText="Name"
        type="text"
        placeholder="Your product name"
        name="name"
        required
        {...productNameData}
      />
      <Input
        labelText="Description"
        type="text"
        placeholder="Your product description"
        name="description"
        required
        {...productDescriptionData}
      />
      <Input
        labelText="Price"
        type="text"
        placeholder="99.99"
        name="price"
        {...productPriceData}
      />

      <Input
        labelText="Stock"
        type="number"
        placeholder="Your product stock"
        name="stock"
        required
        {...productStockData}
      />
      <Input labelText="Image" type="file" name="image" {...productImageData} />

      <label htmlFor="category">Category</label>
      <select
        name="category"
        id="category"
        onChange={handleSelectChange}
        value={selectedCategory}
      >
        <option value="no-category">--Select a category--</option>
        {categories.map((category) => (
          <option key={category.id} value={category.code}>
            {category.name}
          </option>
        ))}
      </select>

      <button>Add</button>
    </form>
  );
};
