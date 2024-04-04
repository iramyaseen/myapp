import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProducts(offset);
  }, [offset]);

  useEffect(() => {
    setOffset(0);
    setHasMore(true);
  }, [products]);

  const fetchProducts = async (offset) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=5`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && hasMore) {
      const newOffset = offset + 5;
      setOffset(newOffset);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        height: "300px",
        overflowY: "auto",
      }}
      onScroll={handleScroll}
    >
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description.slice(0, 40)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
