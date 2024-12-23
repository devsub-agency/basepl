# Website for basepl 
this workspace include the payload backend and the components, blocks, fields, docs and examples used on [basepl](https://basepl.com)

## How to run 

If you want to run this app locally you need the following. 

### Infrastructure 

- MongoDB 
- S3 Bucket 

We use Minio for S3 and run both locale with docker. 

### Env

You .env file have the following content. 

```.env
S3_BUCKET_NAME=
S3_ENDPOINT=
S3_ACCESS_KEY=
S3_SECRET_KEY=
DATABASE_URI=
PAYLOAD_SECRET=
NEXT_PUBLIC_SERVER_URL=

```
