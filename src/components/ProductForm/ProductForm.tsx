import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { Button, Input, ToastNotification } from "..";
import { useFetchAndLoad, useInput } from "../../hooks";
import {
  createProduct,
  getCategories,
  updateProduct,
} from "../../services/public.service";
import { Category, Product } from "../../models";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../redux/states/product.slice";
import { useLocation } from "react-router-dom";
import { productAdapter } from "../../adapters";
import "./ProductForm.scss";
import {
  setToastNotification,
  clearToastNotification,
} from "../../redux/states/toastNotification.slice";

type ProductFormProps = {
  setIsModalOpen: (bool: boolean) => void;
  type: string;
  product?: Product;
};

export const ProductForm = ({
  setIsModalOpen,
  type,
  product,
}: ProductFormProps): React.ReactNode => {
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
  const isDashboardProduct = location.pathname === "/dashboard";

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const productNameData = useInput(product ? product.name : "");
  const productBrandData = useInput(product ? product.brand : "");
  const productDescriptionData = useInput(product ? product.description : "");
  const productPriceData = useInput(product ? product.price : "");
  const productBasePriceData = useInput(product ? product.base_price : "");
  const productStockData = useInput(product ? product.stock : "");

  useEffect(() => {
    if (product) {
      setSelectedCategory(product.category.code);
    }
  }, []);

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
      if (field.toString().trim() === "") {
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
    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }
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
          type === "update" && product
            ? updateProduct(formData, product.id, user.token)
            : createProduct(formData, user.token)
        );
        const data = await response.data;
        dispatch(
          type === "update"
            ? editProduct({
                isDashboardProduct,
                productToEdit: productAdapter(data.product),
              })
            : addProduct({
                isDashboardProduct,
                product: productAdapter(data.product),
              })
        );
        dispatch(
          setToastNotification({ message: data.message, type: "success" })
        );
        setErrorMessage("");
      } catch (error: any) {
        setErrorMessage(error.message);
        dispatch(
          setToastNotification({ message: error.message, type: "danger" })
        );
      } finally {
        setIsModalOpen(false);
      }
    };
    postProduct();
  };

  return (
    <section className="product__form-container glassy border">
      <h2>{type === "update" ? "Edit" : "Create"} a product</h2>
      <form
        action=""
        onSubmit={handleSubmit}
        role="form"
        className="product__form"
      >
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
        <div className="input__image-container">
          <label htmlFor="image">Image:</label>
          <input type="file" name="image" id="image" onChange={handleImage} />
        </div>
        <div className="input__select-container">
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
        <div className="button-create-container">
          <div className="buttons-container">
            <Button disabled={loading}>
              {type === "update" ? "Save" : "Create"}
            </Button>{" "}
            <Button disabled={loading} onClick={closeModal}>
              Cancel
            </Button>{" "}
          </div>
        </div>
      </form>
    </section>
  );
};
