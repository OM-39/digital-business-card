const cloudinary =
    require("../config/cloudinary");

const uploadImage = (
    buffer,
    folder
) => {

    return new Promise(
        (resolve, reject) => {

            const stream =
                cloudinary.uploader.upload_stream(
                    {
                        folder,

                        resource_type:
                            "image",

                        transformation: [
                            {
                                quality:
                                    "auto",

                                fetch_format:
                                    "auto"
                            }
                        ]
                    },

                    (error, result) => {

                        if (error) {
                            reject(error);
                            return;
                        }

                        resolve(result);

                    }
                );

            stream.end(buffer);

        }
    );
};


const deleteImage = async (
    publicId
) => {

    if (!publicId) {
        return;
    }

    await cloudinary.uploader.destroy(
        publicId,
        {
            resource_type:
                "image"
        }
    );

};


module.exports = {
    uploadImage,
    deleteImage
};