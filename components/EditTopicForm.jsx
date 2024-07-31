"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function EditTopicForm({ id, user, title, description, likes, views }) {
    const [newUser, setNewUser] = useState(user);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newLikes, setNewLikes] = useState(likes);
    const [newViews, setNewViews] = useState(views);
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newUser, newTitle, newDescription, newLikes, newViews })
            })

            if (!res.ok) {
                throw new Error("Failed to update topic");
            }

            router.push("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
                <input
                    onChange={(e) => setNewUser(e.target.value)}
                    value={newUser}
                    type="text"
                    placeholder="Post User"
                    className=" border border-slate-500 px-8 py-2" />
                <input
                    onChange={(e) => setNewTitle(e.target.value)}
                    value={newTitle}
                    type="text"
                    placeholder="Post Title"
                    className=" border border-slate-500 px-8 py-2" />
                <input
                    onChange={(e) => setNewDescription(e.target.value)}
                    value={newDescription}
                    type="text"
                    placeholder="Post Description"
                    className=" border border-slate-500 px-8 py-2" />
                <input
                    onChange={(e) => setNewLikes(e.target.value)}
                    value={newLikes}
                    type="number"
                    placeholder="Post likes"
                    className=" border border-slate-500 px-8 py-2" />
                <input
                    onChange={(e) => setNewViews(e.target.value)}
                    value={newViews}
                    type="number"
                    placeholder="Post views"
                    className=" border border-slate-500 px-8 py-2" />
                <button type="submit" className=" bg-green-600 text-white py-3 px-5 font-bold w-fit">
                    Update Topic
                </button>
            </form>
        </>
    )
}