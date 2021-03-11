import React from "react";

const CategoryForm = ({
  handleSubmit,
  name,
  setName,
  title,
  placeholder,
  btn,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>{title}</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder={placeholder}
          autoFocus
          required
        ></input>
        <br />
        <button className="btn btn-outline-primary" disabled={!name}>
          {btn}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
