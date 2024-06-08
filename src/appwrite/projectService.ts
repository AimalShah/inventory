import { Client , ID , Databases  } from "appwrite";

type dataFields = {
    title : string;
    shortDescription : string;
    description : string;
    members : string[];
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

    async createProject({title  , shortDescription , description , members} :dataFields){
        try {
            return await this.databases.createDocument(
                "tetrastudio2024",
                "projects123",
               ID.unique(),
                {
                    title ,
                    shortDescription ,
                    description,
                    members
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async createLinkData({ title , ytLink , imageUrl} : {title :string; ytLink : string; imageUrl : string;}) {

        try {
             return await this.databases.createDocument(
                "tetrastudio2024",
                "link123",
                ID.unique(),
                {
                    ytLink,
                    imageUrl,
                    title
                }
             )
        } catch (error) {
            console.log(error)
        }

    }

    async getData() {
        try {
            const projectData = await this.databases.listDocuments("tetrastudio2024" , "projects123");
            const links = await this.databases.listDocuments("tetrastudio2024" , "link123" );

            const res = {
                projectData : projectData , 
                links : links
            };

            return res;
        } catch (err) {
            console.log(err)
        }
    }

    async deleteProject(id1 : string , id2 :string){
        try{
            await this.databases.deleteDocument(
                "tetrastudio2024" , 
                "projects123",
                id1
            )

            await this.databases.deleteDocument(
                "tetrastudio2024" , 
                "link123",
                id2
            )
        } catch (err) {
            console.log(err)
        }
    } 

}

const database = new Service();

export default database;