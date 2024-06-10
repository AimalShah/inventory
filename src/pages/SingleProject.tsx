import database from "@/appwrite/projectService";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

type Data = {
    title : string;
    shortDescription : string;
    description : string;
    members : string[] | never[] | undefined;
    imageUrl : string;
    ytLink : string; 
}
export default function  SingleProject() {
    const [data , setData] = useState<Data | null | undefined | Document>(null);
    const {id} = useParams();
    const [loading , setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            const res = await database.getSingleProject(id);
            setData(res)
            setLoading(false)
            console.log(res)
        }
        fetchData();
    } , [])

    if(loading){
        return <div>Loading.....</div>
    }

    return (
        <div className="max-w-2xl mx-auto space-y-10">
            <div className="flex items-center justify-end mt-5">
                <div className="space-x-4">
                    <Button>Edit</Button>
                    <Button variant={"destructive"}>Delete</Button>
                </div>
            </div>

            <div className="text-2xl font-semibold">{data?.title}</div>
            <div>
                <img src={data?.imageUrl} alt="" />
            </div>
            <div>
                <h1 className="text-2xl font-semibold">Members</h1>
                <div className="flex items-cenetr">

                {
                    data?.members?.map((member) => (
                        <div>
                        {member}
                        </div>
                    ))
                }
                </div>
            </div>

            <div>
            <h1 className="text-2xl font-semibold">Short Description</h1>
                {data?.shortDescription}
            </div>

            <div>
            <h1 className="text-2xl font-semibold">Description</h1>
            {data?.description}
            </div>

            <div>
                {data?.ytLink}
            </div>
        </div>
    )
    
}