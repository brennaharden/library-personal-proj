const aws = require('aws-sdk');
require('dotenv').config();

module.exports = {
    config: (req, res) => {
        const { S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
        aws.config = {
            region: 'us-west-2',
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }

        const s3 = new aws.S3();
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        }

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err)
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3-us-west-2.amazonaws.com/${fileName}`
            }

            return res.send(returnData)
        })
    },
    saveUrl: async (req, res) => {
        const db = req.app.get('db');
        const {id, url} = req.body
        await db.update_img(id, url)
        req.session.user.img = url
        res.status(200).send('Profile image updated successfully.')
    },
    setBranch: async (req, res) => {
        const db = req.app.get('db');
        const {id, branch} = req.body
        await db.update_branch(id, branch)
        res.status(200).send('User branch updated successfully.')
    }
}