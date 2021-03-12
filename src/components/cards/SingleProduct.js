import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import DefaultImage from "../../images/man2.jpg";

// components
import ProductListItems from "../../components/cards/ProductListItems";

const SingleProduct = ({ product }) => {
  const { title, images } = product;

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => {
                return <img src={image.url} key={image.public_id} />;
              })}
          </Carousel>
        ) : (
          <Card
            cover={<img src={DefaultImage} className="mb-3 card-image" />}
          ></Card>
        )}
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              <br />
              Add to Card
            </>,
            <Link to="/">
              <HeartOutlined />
              <br />
              お気に入り
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
