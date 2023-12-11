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
  setNewProductAdded,
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
  const [flash, setFlash] = useState<boolean>(false);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // if (file) {
    setUploadedImage(file);
    // }
  };

  useEffect(() => {
    if (errorMessage) {
      setFlash(true);
      setTimeout(() => setFlash(false), 1500);
    }
  }, [errorMessage]);

  const productNameData = useInput("");
  const productDescriptionData = useInput("");
  const productPriceData = useInput("");
  const productStockData = useInput("");

  const inputValidation = () => {
    setErrorMessage("");
    const fieldsToValidate = [
      { field: productNameData.value, message: "Name is required" },
      {
        field: productDescriptionData.value,
        message: "Description is required",
      },
      { field: productPriceData.value, message: "Price is required" },
      { field: productStockData.value, message: "Stock is required" },
    ];

    // Validate if there's an empty input
    for (const { field, message } of fieldsToValidate) {
      if (field.trim() === "") {
        setErrorMessage(message);
        return false;
      }
    }
    // validate if price and stock are positive
    if (+productPriceData.value < 0) {
      setErrorMessage("Price must be a positive number");
      return false;
    }
    if (
      +productStockData.value < 0 ||
      +productStockData.value - Math.round(+productStockData.value) !== 0
    ) {
      setErrorMessage("Stock must be a positive integer");
      return false;
    }
    // validate if image's size is less than 2MB
    return true;
  };

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
    if (!inputValidation()) {
      return;
    }
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
    if (!selectedCategoryExists && selectedCategory !== "no-category") {
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
        {...productNameData}
      />
      <Input
        labelText="Description"
        type="text"
        placeholder="Your product description"
        name="description"
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
      {errorMessage && (
        <p className={`error-message ${flash ? "flash" : ""}`}>
          {errorMessage}
        </p>
      )}
      <button>Add</button>
    </form>
  );
};
