import { useState } from "react";
import { api } from "../utils/api";

const ProductForm = ({ addProductToList }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || price <= 0) {
      alert("Invalid inputs");
      return;
    }
    try {
      const res = await api.post("/products", { name, price, description });
      addProductToList(res.data); // Instantly update UI
      setName(""); setPrice(""); setDescription("");
    } catch (err) {
      alert("Login required to add products");
    }
  };

  return (
    <div className="card p-3 my-3">
        <h4>Add Product</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input type="text" className="form-control" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-2">
            <input type="number" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="mb-2">
            <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Product</button>
        </form>
      </div>
  );
};

export default ProductForm;
