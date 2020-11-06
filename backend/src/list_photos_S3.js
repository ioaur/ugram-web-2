const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
});

const listFiles = (username) => {

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix: username,
    };

    s3.listObjectsV2(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } // an error occurred
        else {
            
            let images = [];
            
            data.Contents.forEach((content) => {
                images.push(process.env.AWS_BUCKET_BASE_URL+content.Key);
            });
            
            return images;
        }           // successful response
    });
};
