import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  const fetchProducts = async () => {
    try {
      const params = {};

      if (search) {
        params.search = search;
      }

      if (category !== "All") {
        params.category = category;
      }

      if (sort) {
        params.sort = sort;
      }

      const res = await API.get("/products", {
        params,
      });

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="mb-4">All Products</h2>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row mb-4">
        {/* Category Filter */}
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Sorting */}
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort Products</option>
            <option value="priceAsc">
              Price: Low to High
            </option>
            <option value="priceDesc">
              Price: High to Low
            </option>
            <option value="nameAsc">
              Name: A to Z
            </option>
            <option value="nameDesc">
              Name: Z to A
            </option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="row">
        {products.length === 0 ? (
          <div className="col-12">
            <h5>No products found.</h5>
          </div>
        ) : (
          products.map((product) => (
            <div
              className="col-md-4 mb-4"
              key={product._id}
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;