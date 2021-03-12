import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { useSelector } from "react-redux";

// components
import SingleProduct from "../components/cards/SingleProduct";

//functions
import { productStar } from "../functions/product";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const { slug } = match.params;

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(newRating, name, user.token)
      .then((res) => {
        console.log("rating clicked", res.data);
        loadSingleProduct(); //if you want to show updated rating in real time
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  // userEffectの使われる順番は必ず上から。
  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find((element) => {
        return element.postedBy.toString() === user._id.toString(); //toSting()使わずに、==で比較でもいいけど。  //return忘れてた製でバグってた
      });
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }); //第二引数付けないので,every timeなにか変化があったとき。;

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // デフォルトの評価数を取得してsetStarする。
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>関連商品</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
