import { Client , ID , Databases  } from "appwrite";

type dataFields = {
    title : string;
    shortDescription : string;
    description : string;
    members : string[] | never[] | undefined;
    imageUrl : string;
    ytLink : string; 
    fileId : string;
}



export class Service{

    client = new Client();
    databases;

    constructor(){
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("6628cfe38dc1dbef7f6c")

        this.databases =  new Databases(this.client);
    }

    async createProject({title  , shortDescription , description , members , imageUrl , ytLink , fileId} : dataFields){
        try {
            return await this.databases.createDocument(
                "tetrastudio2024",
                "projects123",
               ID.unique(),
                {
                    title ,
                    shortDescription ,
                    description,
                    members,
                    imageUrl,
                    ytLink,
                    fileId
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async getData() {
        try {
            const projectData = await this.databases.listDocuments("tetrastudio2024" , "projects123");
            return projectData;
        } catch (err) {
            console.log(err)
        }
    }
    async getSingleProject (id : string) {
        try {
            const res = await this.databases.getDocument("tetrastudio2024" , "projects123" , id)
            return res;
        } catch (err) {
            console.log(err)
        }
    }

    async deleteProject(id : string){
        try{
            await this.databases.deleteDocument(
                "tetrastudio2024" , 
                "projects123",
                id
            )
        } catch (err) {
            console.log(err)
        }
    } 

}

const database = new Service();

export default database;