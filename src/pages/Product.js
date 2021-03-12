import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";

// components
import SingleProduct from "../components/cards/SingleProduct";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, []);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>
      <div className="row">
        <h4>RelatedProduct</h4>
        {/* <RelatedProduct /> */}
      </div>
    </div>
  );
};

export default Product;
