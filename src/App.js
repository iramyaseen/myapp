import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
import { fetchproducts } from "./Redux/ProductSlice";
function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(fetchproducts(5));
  }, []);

  const handlePageChange = (pageNumber) => {
    const offset = pageNumber * 5;
    dispatch(fetchproducts(offset));
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
