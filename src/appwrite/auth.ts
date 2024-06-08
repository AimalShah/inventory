import { Client,  Account , ID} from "appwrite";

type Fields = {
    email : string;
    password : string;
    name : string;
}

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("6628cfe38dc1dbef7f6c")
        
        this.account = new Account(this.client);
    }

    async createAccount({email ,password , name} : Fields){
        try {
            const userAccount = await this.account.create(ID.unique(), email , password , name);

            if(userAccount){
                return this.login({email , password});
            } else {
                return userAccount;
            }
        } catch (error : unknown) {
            throw error;
            
        }
    }

    async login({email , password} : {email : string; password : string;}) {
        try {
            return await this.account.createEmailSession(email , password);
        } catch (error) {
            console.log(error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession("current");
        } catch (error) {
        }
    }
}

const authService  = new AuthService();

export default authService;