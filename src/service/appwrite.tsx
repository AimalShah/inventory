import { Client, Databases, Account , Storage} from "appwrite";

const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6628cfe38dc1dbef7f6c');
    
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);