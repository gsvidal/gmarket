import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { Button, Input } from "..";
import { useFetchAndLoad, useInput } from "../../hooks";
import { createProduct, getCategories } from "../../services/public.service";
import { Category } from "../../models";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/states/product.slice";
import { useLocation } from "react-router-dom";
import { productAdapter } from "../../adapters";

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
  const dispatch = useDispatch();
  const location = useLocation();
  const isSellerProduct = location.pathname === "/dashboard";

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const isValidImageSize = (file: File | undefined) => {
    if (file && file.size > 2 * 1024 * 1024) {
      setErrorMessage("Image size must be less than or equal to 2MB");
      return false;
    }
    return true;
  };

  const isValidImageType = (file: File | undefined) => {
    return (
      file?.type === "image/png" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/jpg"
    );
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (isValidImageType(file)) {
      setErrorMessage("");
      setUploadedImage(file);
    } else {
      setErrorMessage("Please upload a valid image file: jpg/jpeg/png.");
      event.target.value = "";
    }
  };

  const productNameData = useInput("");
  const productBrandData = useInput("");
  const productDescriptionData = useInput("");
  const productPriceData = useInput("");
  const productBasePriceData = useInput("");
  const productStockData = useInput("");

  const areProductInputsValid = () => {
    const fieldsToValidate = [
      { field: productNameData.value, message: "Name is required" },
      { field: productBrandData.value, message: "Brand is required" },
      {
        field: productDescriptionData.value,
        message: "Description is required",
      },
      { field: productBasePriceData.value, message: "Base price is required" },
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
    // validate if price and stock are numbers and positive
    if (isNaN(+productBasePriceData.value) || +productBasePriceData.value < 0) {
      setErrorMessage("Base price must be a positive number");
      return false;
    }

    if (isNaN(+productPriceData.value) || +productPriceData.value < 0) {
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

    if (
      uploadedImage &&
      (!isValidImageSize(uploadedImage) || !isValidImageType(uploadedImage))
    ) {
      return false;
    }
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
    if (!areProductInputsValid()) {
      return;
    }
    // Create a FormData instance
    const formData = new FormData();
    formData.append("name", productNameData.value as string);
    formData.append("brand", productBrandData.value as string);
    formData.append("description", productDescriptionData.value as string);
    formData.append("base_price", productBasePriceData.value as string);
    formData.append("price", productPriceData.value as string);
    formData.append("stock", productStockData.value as string);
    formData.append("image", uploadedImage as File); // Append the first file in the FileList
    formData.append("category_code", selectedCategory as string);
    formData.append("seller_id", user.id.toString() as string);

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
        const data = await response.data;
        console.log(data);
        // TODO: Toast
        // console.log(response);
        dispatch(
          addProduct({
            isSellerProduct,
            product: productAdapter(data.product),
          })
        );
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
    <>
      <h2>Create a new product</h2>
      <form action="" onSubmit={handleSubmit} role="form">
        <Input
          labelText="Name"
          type="text"
          placeholder="Your product name"
          name="name"
          className="required"
          {...productNameData}
        />
        <Input
          labelText="Brand"
          type="text"
          placeholder="Your product brand: Apple, Sony, Generic,etc..."
          name="brand"
          className="required"
          {...productBrandData}
        />
        <Input
          labelText="Description"
          type="text"
          placeholder="Your product description"
          name="description"
          className="required"
          {...productDescriptionData}
        />
        <Input
          labelText="Base Price"
          type="text"
          placeholder="129.99"
          name="base_price"
          className="required"
          {...productBasePriceData}
        />
        <Input
          labelText="Price"
          type="text"
          placeholder="99.99"
          name="price"
          className="required"
          {...productPriceData}
        />
        <Input
          labelText="Stock"
          type="number"
          placeholder="Your product stock"
          name="stock"
          className="required"
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
          <p className={`error-message ${errorMessage ? "fade-in" : ""}`}>
            {errorMessage}
          </p>
        )}
        <Button disabled={loading} className="danger">
          Add
        </Button>{" "}
      </form>
    </>
  );
};
