import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { user, title, description, likes, views } = await request.json();
    await connectMongoDB();
    await Post.create({ user, title, description, likes, views });
    return NextResponse.json({ message: "Post Created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const posts = await Post.find();
    return NextResponse.json({ posts })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted Post" }, { status: 200 })
}