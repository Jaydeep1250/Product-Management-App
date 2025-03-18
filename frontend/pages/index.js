import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./_app";
import { api } from "../utils/api";
import { useRouter } from "next/router";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!user) return router.push("/login");

    try {
      await api.post(
        "/products",
        { name, price, description },
        { headers: { Authorization: `Bearer ${user.access_token}` } }
      );
      setName("");
      setPrice("");
      setDescription("");
      fetchProducts();
    } catch (error) {
      alert("Failed to add product!");
    }
  };

  const handleDelete = async (id) => {
    if (!user) return router.push("/login");

    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      fetchProducts();
    } catch (error) {
      alert("Failed to delete product!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Product List</h2>
        {user && <button className="btn btn-danger" onClick={logout}>Logout</button>}
      </div>

      {/* Add Product Form */}
      <div className="card p-3 my-3">
        <h4>Add Product</h4>
        <form onSubmit={handleAddProduct}>
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

      {/* Product List */}
      <div className="row">
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
      />
        {products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card p-3 mb-3">
              <h5>{product.name}</h5>
              <p>${product.price}</p>
              <p>{product.description}</p>
              {user && <button className="btn btn-danger w-100" onClick={() => handleDelete(product.id)}>Delete</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
