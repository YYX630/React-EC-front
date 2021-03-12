import axios from "axios";
import { removeImage } from "./cloudinary";

//一定数表示
export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/products/${count}`);
};

//New Arrivals や Best Sellers
export const getProducts = async (sort, order, limit, page) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
    sort,
    order,
    limit,
    page, //省略されてるが、page: pageという意味。文字列：変数
  }); //第二引数はbody
};

export const removeProduct = async (slug, images, authtoken) => {
  //含まれてる写真も削除する。awaitは必要ない
  if (images && images.length) {
    images.map((image) => {
      removeImage(image.public_id, authtoken)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
  }
  //製品そのものの削除
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/${slug}`,
    {
      headers: {
        authtoken: authtoken,
      },
    }
  ); //axiosのdeleteメソッドはbodyを付けない
};

export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`); //第二引数は送信内容のbody。第3引数はheader。
};

export const updateProduct = async (slug, product, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/product/${slug}`,
    product, //productにはjsonオブジェクトが代入されるので、直でoK. product = {name: name}すね。
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/product`, product, {
    headers: {
      authtoken: authtoken,
    },
  });
};

export const getProductsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/countproducts`);
};

export const productStar = async (star, productId, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/product/star/${productId}`,
    { star: star },
    { headers: { authtoken: authtoken } }
  );
};
