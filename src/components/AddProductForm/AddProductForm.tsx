import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { Input } from "..";
import { useFetchAndLoad, useInput } from "../../hooks";
import { createProduct, getCategories } from "../../services/public.service";
import { Category } from "../../models";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

type AddProductFormProps = {
  setIsModalOpen: (bool: boolean) => void;
  setNewProductAdded: (bool: boolean) => void;
};

export const AddProductForm = ({
  setIsModalOpen,
  setNewProductAdded
}: AddProductFormProps): React.ReactNode => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { loading, callEndPoint } = useFetchAndLoad();
  const user = useSelector((store: AppStore) => store.user);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("no-category");
  const [uploadedImage, setUploadedImage] = useState<File | undefined>(
    undefined
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const productNameData = useInput("");
  const productDescriptionData = useInput("");
  const productPriceData = useInput("");
  const productStockData = useInput("");

  // const inputValidation = () => {
  //   setErrorMessage("");
  //   const fieldsToValidate = [
  //     { field: productName, message: "Name is required" },
  //     { field: productDescription, message: "Description is required" },
  //     { field: productPrice, message: "Description is required" },
  //     { field: productStock, message: "Description is required" },
  //   ];

  //   validate if price and stock are positive
  //   validate if image's size is less than 2MB
  // }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await callEndPoint(getCategories(user.token));
        setCategories(response.data.categories);
        setErrorMessage("");
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create a FormData instance
    const formData = new FormData();
    formData.append("name", productNameData.value as string);
    formData.append("description", productDescriptionData.value as string);
    formData.append("price", productPriceData.value as string);
    formData.append("stock", productStockData.value as string);
    formData.append("image", uploadedImage as File); // Append the first file in the FileList
    formData.append("category_code", selectedCategory as string);
    formData.append("seller_id", user.id.toString() as string);

    // how to get formData values?
    for (let value of formData.values()) {
      console.log(value);
    }

    // Check if the selected category code exists in the fetched categories
    const selectedCategoryExists = categories.some(
      (category) => category.code === selectedCategory
    );
    if (!selectedCategoryExists) {
      setErrorMessage("Please select a valid category.");
      return;
    }

    const postProduct = async () => {
      try {
        const response = await callEndPoint(
          createProduct(formData, user.token)
        );
        console.log(response);
        setErrorMessage("");
        setIsModalOpen(false);
        setNewProductAdded(true);
      } catch (error: any) {
        setErrorMessage(error.message);
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
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" name="image" id="image" onChange={handleImage} />
      </div>

      <div className="select-input">
        <label htmlFor="category">Category:</label>
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
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button>Add</button>
    </form>
  );
};
