import React, { useState, useEffect } from "react";
import { scroller } from "react-scroll";

// components
import ProductCard from "../cards/product/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

// functions
import { getProducts, getProductsCount } from "../../functions/product";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    loadAllProducts();
    scrollToSection("bestSellers");
  }, [page]);

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    getProductsCount().then((res) => setProductsCount(res.data));
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  // loaders
  const loadAllProducts = () => {
    setLoading(true);
    //sort, order, limit
    getProducts("sold", "desc", perPage, page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    }, []);
  };

  // scroll
  const scrollToSection = (className) => {
    scroller.scrollTo(className, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  return (
    <>
      <div className="row top">
        <nav className="col-md-4 offset-md-4 text-center p-3">
          <Pagination
            simple
            current={page}
            total={productsCount}
            pageSize={perPage}
            hideOnSinglePage
            responsive
            // showQuickJumper
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
      <br />
      <div className="container">
        {loading ? (
          <LoadingCard count={perPage} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
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
      <br />
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            // simple
            current={page}
            total={productsCount}
            pageSize={perPage}
            hideOnSinglePage
            responsive
            // showQuickJumper
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};
export default BestSellers;
