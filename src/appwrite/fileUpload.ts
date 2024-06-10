import { Client , ID, Storage } from "appwrite";

export class FileService {
    client = new Client();
    bucket;
    bucketId = "6628f2f5296624771cf2"

    constructor() {
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("6628cfe38dc1dbef7f6c")

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file : File){
        try {

            return await this.bucket.createFile(
                this.bucketId,
                ID.unique(),
                file
            )
        } catch (err) {
            console.log(err)
        }
    }

    async getFile(fileid : string) {
    try {
      const res = await this.bucket.getFileView( this.bucketId, fileid)
      return res;
    } catch (err) {
        console.log(err)
    }
    }

    async deleteFile(id : string){
        try {
            await this.bucket.deleteFile(
                this.bucketId,
                id
            )
            return true;

        } catch (err) {
            console.log(err)
        }
    }

}

const fileUpload = new FileService();

export default fileUpload;