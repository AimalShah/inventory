import { Client , Storage } from "appwrite";

export class FileService {
    client = new Client();
    bucket;

    constructor() {
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("6628cfe38dc1dbef7f6c")

        this.bucket = new Storage(this.client);
    }

    async getFile(fileid : string) {
    try {
      const res = await  this.bucket.getFileView("6628f2f5296624771cf2" , fileid)
      return res;
    } catch (err) {
        console.log(err)
    }
    }
}

const file = new FileService();

export default file;