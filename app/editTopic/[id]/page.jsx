import EditTopicForm from "@/components/EditTopicForm";

const getPostById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
            cache: "no-store",
        })

        if (!res.ok) {
            throw new Error("Failed to fetch topic");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export default async function EditTopic({ params }) {
    const { id } = params
    const { topic } = await getPostById(id);
    const { user, title, description, likes, views } = topic;

    return <EditTopicForm id={id} user={user} title={title} description={description} likes={likes} views={views} />
}