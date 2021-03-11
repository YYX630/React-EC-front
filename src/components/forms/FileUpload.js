import React, { useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

//functions
import { createImage, removeImage } from "../../functions/cloudinary";

const FileUpload = ({ values, setValues, setLoading }) => {
  // we need user to pas the admin check required in the process of sending image because we made so in the back end
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    let files = e.target.files; //配列
    let allUploadedFiles = values.images;
    console.log(files);
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        // front でimageをresize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          //callback関数
          //upload to cloudinary to get URL
          (uri) => {
            createImage(uri, user.token)
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data); //res.data has the image url in cloudinary
                // set url to images[] in the parent component so that we can save in DB
                setValues({ ...values, images: allUploadedFiles }); //そのたびにvalues増えていくので、これでも大丈夫
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }

      //   setValues({ ...values, images: allUploadedFiles });
    }
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    removeImage(id, user.token)
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== id; //真偽の判定をする関数。filterのアルゴリズムに使われる。
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log("REMOVE IMAGE ERR", err);
      });
    // setLoading(false);
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => {
            return (
              <Badge
                count="X"
                key={image.public_id}
                onClick={() => handleImageRemove(image.public_id)}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  src={image.url}
                  size={100}
                  shape="square"
                  className="ml-3"
                />
              </Badge>
            );
          })}
      </div>
      <div className="row">
        <label className="btn btn-primary mt-3">
          画像アップロード
          <input
            type="file"
            multiple
            hidden
            //   accept="images/*" //imageからはじまるファイルのみ受け付ける。　/*は、それ以下は何でもいいということ。
            onChange={fileUploadAndResize} //1mbまでとかにしたい
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
