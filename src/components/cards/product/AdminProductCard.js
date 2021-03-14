import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../images/man2.jpg";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destruction
  const { title, slug, description, category, subs, images } = product;

  return (
    <div>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImage}
            style={{ height: "300px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined className="text-warning" />
          </Link>,
          <DeleteOutlined
            onClick={() => handleRemove(slug, images)}
            className="text-danger"
          />,
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

export default AdminProductCard;
