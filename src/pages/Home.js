import React, { useState, useEffect } from "react";

// components
import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";
import { LoadingOutlined } from "@ant-design/icons";

// functions
import { getProductsByCount } from "../functions/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  // loaders
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    }, []);
  };

  return (
    <>
      <div className="jumbotron h1 text-danger font-wight-bold text-center">
        <Jumbotron text={["随時増築中", "YYX630"]} />
        {/* {loading ? (
          <LoadingOutlined className="text-danger h1" />
        ) : (
          <h4>Under Construction</h4>
        )} */}
      </div>
      <div className="container">
        {/* {JSON.stringify(products)} */}

        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 pb-3" key={product._id}>
                {/* keyを充てることで、ひとつひとつのCardがmeaningfulになる */}
                <ProductCard
                  product={product}
                  // handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
