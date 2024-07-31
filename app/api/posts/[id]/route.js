import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newUser: user, newTitle: title, newDescription: description, newLikes: likes, newViews: views } = await request.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { user, title, description, likes, views });
    return NextResponse.json({ message: "Post updated" }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 });
}