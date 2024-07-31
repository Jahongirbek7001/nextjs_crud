"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function AddTopic() {
    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [likes, setLikes] = useState();
    const [views, setViews] = useState();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !title || !description || !likes || !views) {
            alert("Title and Description are required")
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ user, title, description, likes, views })
            });

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create a topic")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
                <input
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    type="text"
                    placeholder="Post User"
                    className=" border border-slate-500 px-8 py-2" />
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    placeholder="Post Title"
                    className=" border border-slate-500 px-8 py-2" />

                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    placeholder="Post Description"
                    className=" border border-slate-500 px-8 py-2" />
                <input
                    onChange={(e) => setLikes(e.target.value)}
                    value={likes}
                    type="number"
                    placeholder="Post Likes"
                    className=" border border-slate-500 px-8 py-2" />
                <input
                    onChange={(e) => setViews(e.target.value)}
                    value={views}
                    type="number"
                    placeholder="Post Views"
                    className=" border border-slate-500 px-8 py-2" />

                <button type="submit" className=" bg-green-600 text-white py-3 px-5 font-bold w-fit">
                    Add Post
                </button>
            </form>
        </>
    )
}