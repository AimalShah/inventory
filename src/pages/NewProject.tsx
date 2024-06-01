import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ChangeEvent, useState } from "react"

const members = [
    "hasan",
    "raza",
    "aimal",
    "adil",
    "sajawal",
    "talha",
    "salaudin",
    "zain"
]

export default function NewProject() {
    const [title, setTitle] = useState<String>('');
    const [sDes, setSDes] = useState<String>('');
    const [des, setDes] = useState<String>('');
    const [link, setLink] = useState<String>('');
    const [team, setTeam] = useState<String[]>([]);

    const submit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    }

    return (
        <div className="container mx-auto mt-5">
            <h1 className="font-bold text-3xl">New Project</h1>
            <div className="flex justify-center flex-col gap-5 mt-10">
                <div>
                    <Label>Project Title</Label>
                    <Input type="text" placeholder="title" />
                </div>
                <div>
                    <Label>Project Image</Label>
                    <Input type="file" className="text-white" />
                </div>
                <div>
                    <Label>Project Shrot Description</Label>
                    <Textarea></Textarea>
                </div>
                <div>
                    <Label>Project Description</Label>
                    <Textarea></Textarea>
                </div>
                <div>
                    <Label>Youtube Link</Label>
                    <Input type="text" />
                </div>
                <div>
                    Team Members
                    <div className="flex gap-2 list-none mt-2">
                        {
                            members.map((member: string, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <Checkbox id={member} value={member} />
                                    <Label htmlFor={member} className="font-semibold">{member}</Label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex-grow">
                    <Button className="w-full mb-10">Create</Button>
                </div>
            </div>
        </div>
    )
}