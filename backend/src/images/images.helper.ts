import * as AWS from "aws-sdk";

let s3 = undefined;
const getOrCreateS3 = () => {
    if (s3 === undefined) {
        AWS.config.update({ accessKeyId: process.env.AWS_ID, secretAccessKey: process.env.AWS_SECRET });
        s3 = new AWS.S3();
    }
    return s3;
};

const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const uploadFileToS3 = async (username: string, base64str: string) => {
    try {
        const fileuniqueID = uuidv4();
        const fileContent = Buffer.from(base64str, "base64");

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: username + "/" + fileuniqueID,
            Body: fileContent,
            ContentEncoding: "base64",
            ContentType: "image/jpeg",
            ACL: "public-read",
        };

        const { Location } = await getOrCreateS3()
            .upload(params)
            .promise();
        return Location;
    } catch (error) {
        throw error;
    }
};

export { uploadFileToS3, uuidv4 };
