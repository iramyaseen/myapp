import React, { useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (offset) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=0&limit=${offset}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(5);
  }, []);

  const handlePageChange = (pageNumber) => {
    const offset = pageNumber * 5;
    fetchProducts(offset);
  };

  return (
    <div style={{ padding: "30px" }}>
      <Pagination>
        {[1, 2, 3, 4, 5].map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description.slice(0, 40)}</td>
              <td>
                <img src={product.category?.image} alt="" width={100} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
