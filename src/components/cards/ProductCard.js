import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../images/man2.jpg";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // destruction
  const { title, slug, description, category, subs, images } = product;

  return (
    <div>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">評価はまだありません</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImage}
            style={{ height: "200px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-info" />
            <br />
            View Product
          </Link>,
          <>
            <ShoppingCartOutlined className="text-success" />
            <br />
            Add to Cart
          </>,
        ]}
      >
        <Meta
          title={title}
          //   description={`${description && description.substring(0, 40)}`}
          description={description}
        />
      </Card>
    </div>
  );
};

export default ProductCard;
