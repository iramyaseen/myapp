import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Table } from "reactstrap";

const Infinite = () => {
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=5`;

    axios
      .get(url)
      .then((response) => {
        const newData = response.data;
        setDataSource((prevData) => [...prevData, ...newData]);
        setOffset((prevOffset) => prevOffset + 5);
        setLoading(false);
        if (newData.length === 0) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <div id="parentScrollDev" style={{ height: "300px", overflow: "scroll" }}>
      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchData}
        hasMore={hasMore}
        endMessage={<p>Your All set!</p>}
        scrollableTarget="parentScrollDev"
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
            {dataSource.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description.slice(0, 40)}</td>
              </tr>
            ))}
            {loading && <p>Loading......</p>}
          </tbody>
        </Table>
      </InfiniteScroll>
    </div>
  );
};

export default Infinite;
