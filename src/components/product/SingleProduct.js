import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import DefaultImage from "../../images/man2.jpg";
import StarRating from "react-star-ratings";

// components
import ProductListItems from "./ProductListItems";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

// destruction
const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star, setStar }) => {
  const { _id, title, description, images } = product;

  return (
    <>
      <div className="row pt-4">
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
            />
          )}
        </div>
        {/* ----------------------------------------------------------------------------------------------- */}{" "}
        <div className="col-md-5">
          <h1 className="bg-info p-3"> {title} </h1>
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <>
              {setStar(0)}
              <div className="text-center pt-1 pb-3">
                {" "}
                評価はまだありません{" "}
              </div>
            </>
          )}
          <Card
            actions={[
              <>
                <ShoppingCartOutlined className="text-success" />
                <br />
                カートに追加
              </>,
              <Link to="/">
                <HeartOutlined className="text-info" />
                <br />
                お気に入り
              </Link>,
              <RatingModal>
                <StarRating
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  isSelectable={true}
                  starRatedColor="red"
                  changeRating={onStarClick}
                />{" "}
              </RatingModal>,
            ]}
          >
            <ProductListItems product={product} />
          </Card>
        </div>
      </div>
      <br />
      <Tabs type="card">
        <TabPane tab="製品詳細" key="1">
          {description && description}
        </TabPane>
        <TabPane tab="注意書き" key="2">
          お問い合わせは080 - 1234 - 5678 まで
        </TabPane>
      </Tabs>
    </>
  );
};

export default SingleProduct;
