import React, { useEffect } from "react";
// import SubOptionsForm from "./subOptionsForm";

import { Select } from "antd";
const { Option } = Select;

const SubOptionsForm = ({ values, setValues, subOptions }) => {
  const { category, subs } = values;

  return category ? (
    <div className="form-group">
      <label>サブカテゴリ―</label>

      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="選択"
        value={subs} //idの配列でなくてはならない。
        onChange={(value) => setValues({ ...values, subs: value })}
      >
        {/* <Option>選択</Option> */}
        {subOptions.length > 0 &&
          subOptions.map((c) => {
            return (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            );
          })}
      </Select>
    </div>
  ) : (
    ""
  );
};

const ProductCreateForm = ({
  values,
  setValues,
  categories,
  subOptions,
  handleSubmit,
  handleChange,
  handleCategoryChange,
  btn,
}) => {
  // destruction
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  // const handleSubform
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>製品名</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
          autoFocus
        />
      </div>
      <br />

      <div className="form-group">
        <label>説明</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <br />

      <div className="form-group">
        <label>価格</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      <br />

      {/* <div className="form-group">
        <label>配達</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
          value={shipping ? shipping : "please select"}
        >
          <option value="please select">選択</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <br /> */}

      <div className="form-group">
        <label>在庫数量</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <br />

      <div className="form-group">
        <label>カラー</label>
        <input
          type="text"
          name="color"
          className="form-control"
          value={color}
          onChange={handleChange}
        />
      </div>
      <br />

      {/* <div className="form-group">
        <label>色</label>
        <select
          name="color"
          className="form-control"
          onChange={handleChange}
          value={color ? color : "please select"}
        >
          <option value="please select">選択</option>
          {colors.map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
        </select>
      </div>
      <br /> */}

      <div className="form-group">
        <label>ブランド</label>
        <input
          type="text"
          name="brand"
          className="form-control"
          value={brand}
          onChange={handleChange}
        />
      </div>
      {/* <div className="form-group">
        <label>ブランド</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleChange}
          defaultValue={brand}
          value={brand ? brand : "please select"}
        >
          <option value="please select">選択</option>
          {brands.map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
        </select>
      </div> */}
      <br />
      <div className="form-group">
        <label>カテゴリー</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={category ? category : "please select"}
        >
          <option value="please select">選択</option>
          {categories.length > 0 &&
            categories.map((c) => {
              return (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              );
            })}
        </select>
      </div>
      <br />
      <SubOptionsForm
        values={values}
        setValues={setValues}
        subOptions={subOptions}
      />

      <br />
      <button className="btn btn-outline-info">{btn}</button>
    </form>
  );
};

export default ProductCreateForm;
