import axios from "axios";

export const createImage = async (uri, authtoken) => {
  //upload to cloudinary to get URL
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/uploadimages`,
    { image: uri }, //body
    {
      //その他
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

export const removeImage = async (id, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/removeimage`,
    { public_id: id },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
