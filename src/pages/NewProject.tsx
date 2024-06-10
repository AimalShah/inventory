import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import fileUpload from "@/appwrite/fileUpload"
import { members } from "@/data/teamData"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Cross1Icon } from "@radix-ui/react-icons"
import database from "@/appwrite/projectService"

type Data = {
    title: string;
    shortDescription: string;
    description: string;
    ytLink: string;
    ImageUrl: string;
    members: string[] | never[] | undefined;
    fileId : string;
}

export default function NewProject() {
    const [data, setData] = useState<Data>({
        title: '',
        shortDescription: '',
        description: '',
        ytLink: '',
        ImageUrl: '',
        members: [],
        fileId : ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [file, setFile] = useState<File | null | undefined>(null)

    const submit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.ImageUrl === '') {
            return alert("Please upload image first")
        }
        try {

            const res = await database.createProject({
                title: data.title,
                shortDescription: data.shortDescription,
                description: data.description,
                members: data.members,
                imageUrl: data.ImageUrl,
                ytLink: data.ytLink,
                fileId : data.fileId,
            })

            setData({
                title: '',
                shortDescription: '',
                description: '',
                ytLink: '',
                ImageUrl: '',
                members: [],
                fileId : ''
            })
            alert("Project Uploaded Succcessfully!!!")
        } catch (err) {
            console.log(err)
            alert("error creating projects")
        }

    }

    const uploadFile = async () => {
        setLoading(true)

        if (file) {
            try {
                const res = await fileUpload.uploadFile(file);
                console.log(res)
                if (res) {
                    const resUrl = await fileUpload.getFile(res.$id);
                    setData({ ...data, ImageUrl: resUrl?.href , fileId : res.$id })
                }
                setLoading(false)
            } catch (err) {
                console.log(err)
                alert("error Uploading image")
                setLoading(false)
            }

        }


    }

    return (
        <div className="min-w-0 max-w-xl mx-auto mt-5">
            <h1 className="font-bold text-3xl">New Project</h1>
            {data.ImageUrl === "" ? ""
                : (<div className="w-full h-60 rounded border mt-5">
                    <img src={data.ImageUrl}
                        className="w-full h-full"
                        alt="" />
                </div>)
            }
            <div className="mt-5 space-y-2">
                <h1 className="font-xl font-semibold p-2">Choose Featured Image for Project</h1>
                <Input type="file" className="text-white" onChange={(e: MouseEvent<HTMLButtonElement>) => {
                    setFile(e.target.files?.[0])
                }} />
                <Button onClick={uploadFile}>
                    {loading ? "Uploading..." : "Upload"}
                </Button>
            </div>
            <form onSubmit={submit}>
                <div className="flex justify-center flex-col gap-5 mt-10">
                    <div>
                        <Label>Project Title</Label>
                        <Input type="text" placeholder="title" value={data.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, title: e.target.value })} />
                    </div>
                    <div>
                        <Label>Project Shrot Description</Label>
                        <Textarea value={data.shortDescription}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, shortDescription: e.target.value })}></Textarea>
                    </div>
                    <div>
                        <Label>Project Description</Label>
                        <Textarea value={data.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, description: e.target.value })}></Textarea>
                    </div>
                    <div>
                        <Label>Youtube Link</Label>
                        <Input type="text" value={data.ytLink}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, ytLink: e.target.value })}
                        />
                    </div>
                    <div >
                        <h1 > Team Members</h1>
                        <div className="flex flex-wrap flex-col gap-4 list-none mt-2 p-2 border rounded">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"outline"}>
                                        Select Members
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {
                                        members.map((member, index) => (
                                            <DropdownMenuItem
                                                onClick={(e) => setData({ ...data, members: [...data.members, member.name] })}
                                                key={member.name}
                                                id={member.name}
                                            >
                                                {member.name}
                                            </DropdownMenuItem>
                                        ))
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {
                                data.members.map((member) => (
                                    <div className="flex justify-between items-center w-full p-4 rounded border">
                                        <div className="flex items-center gap-4">
                                        {member}
                                        </div>
                                        <Cross1Icon id={member} onClick={() => setData({ ...data, members: data?.members?.filter((e) => e !== member) })} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex-grow">
                        <Button className="w-full mb-10" type="submit">Create</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}