import { Input } from "..";

export const AddProductForm = () => {
  return (
    <form action="">
      <Input
        labelText="Name"
        type="text"
        placeholder="Your product name"
        name="name"
      />
      <Input
        labelText="Description"
        type="text"
        placeholder="Your product description"
        name="description"
      />
      <Input labelText="Price" type="text" placeholder="99.99" name="price" />

      <Input
        labelText="Stock"
        type="number"
        placeholder="Your product stock"
        name="stock"
      />
      <Input labelText="Image" type="file" name="image" />

      <label htmlFor="category">Category</label>
      <select name="category" id="category">
        <option value="">--Select a category--</option>
        <option value="technology">Technology</option>
        <option value="grocery">Grocery</option>
        <option value="fashion">fashion</option>
      </select>

      <button>Add</button>
    </form>
  );
};
