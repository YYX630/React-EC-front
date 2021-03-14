import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/categories`); //第二引数は送信内容のbody。第3引数はheader。
};

export const getCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/category/${slug}`); //第二引数は送信内容のbody。第3引数はheader。
};

export const getCategoryWithProducts = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/category-with-products/${slug}`
  );
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    {
      headers: {
        authtoken: authtoken,
      },
    }
  ); //axiosのdeleteメソッドはbodyを付けない
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    category, //categoryにはjsonオブジェクトが代入されるので、直でoK. category = {name: name}すね。
    {
      headers: {
        authtoken: authtoken,
      },
    }
  ); //第二引数は送信内容のbody。第3引数はheader。
};

export const createCategory = async (category, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/category`,
    category,
    {
      headers: {
        authtoken: authtoken,
      },
    }
  ); //第二引数は送信内容のbody。第3引数はheader。
};

export const getCategorySubs = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/category/subs/${_id}`
  );
};
