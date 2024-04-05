import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spinner } from "reactstrap";
import { fetchproducts } from "./Redux/ProductSlice";

function App() {
  const [offset, setOffset] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);

  useEffect(() => {
    setIsLoading(true);
    if (offset <= 50) {
      dispatch(fetchproducts(offset)).then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, offset]);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 5);
  };

  return (
    <div>
      <Table style={{ background: "red" }}>
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
          <tr ref={loader}>
            <td colSpan="4" style={{ textAlign: "center", padding: "50px" }}>
              {isLoading && <Spinner color="primary" />}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
