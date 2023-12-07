import { ChangeEvent, useState } from "react";
import { Input } from "..";
import { useFetchAndLoad, useInput } from "../../hooks";

export const AddProductForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { loading, callEndPoint } = useFetchAndLoad();
  const [category, setCategory] = useState('no-category');


  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
  }

  const productNameData = useInput("")
  const productDescriptionData = useInput("")
  const productPriceData = useInput("")
  const productStockData = useInput("")
  const productImageData = useInput("")

  // const inputValidation = () => {
  //   setErrorMessage("");
  //   const fieldsToValidate = [
  //     { field: productName, message: "Name is required" },
  //     { field: productDescription, message: "Description is required" },
  //     { field: productPrice, message: "Description is required" },
  //     { field: productStock, message: "Description is required" },
  //   ];
  // }

  return (
    <form action="">
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
      <Input labelText="Price" type="text" placeholder="99.99" name="price" {...productPriceData}/>

      <Input
        labelText="Stock"
        type="number"
        placeholder="Your product stock"
        name="stock"
        {...productStockData}
      />
      <Input labelText="Image" type="file" name="image" {...productImageData}/>

      <label htmlFor="category">Category</label>
      <select name="category" id="category" onChange={handleSelectChange} value={category}>
        <option value="no-category">--Select a category--</option>
        <option value="technology">Technology</option>
        <option value="grocery">Grocery</option>
        <option value="fashion">fashion</option>
      </select>

      <button>Add</button>
    </form>
  );
};
