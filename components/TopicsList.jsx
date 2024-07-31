import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from 'react-icons/hi';

const getPosts = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/posts', {
            cache: 'no-store',
        })

        if (!res.ok) {
            throw new Error("Failed to fetch posts");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading posts", error);
    }
}

export default async function TopicsList() {

    const { posts } = await getPosts();

    return (
        <>
            {posts.map((t) => (
                <div key={t.id} className=" p-4 border border-slate-300 my-3 flex justify-between items-start gap-5">
                    <div>
                        <h1 className=" text-2xl font-bold">{t.user}</h1>
                        <h3 className=" text-2xl font-bold">{t.title}</h3>
                        <p>{t.description}</p>
                        <p>{t.likes}</p>
                        <p>{t.views}</p>
                    </div>

                    <div className=" flex gap-2">
                        <RemoveBtn id={t._id} />
                        <Link href={`./editTopic/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
}