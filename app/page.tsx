import { getPostTopPage } from "@/lib/notion";
import Link from "next/link";
import { Post } from "@/types/types";
import SinglePost from "@/components/post/single-post";
import Meta from "@/components/meta/meta";

export default async function Home() {
    const allPosts = await getPostTopPage();
  return (
    <div className="container h-full w-full mx-auto">
      <Meta pageTitle="Home" />

      <main className="container lg:w-5/6 mx-auto mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Home</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 mb-5">
          {allPosts.map((post: Post) => (
            <SinglePost
              key={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          ))}
        </div>

        <Link
          href="/posts/page/1"
          className="link link-info mb-6 mx-auto px-5 block text-right"
        >
          ...もっと見る
        </Link>
      </main>
    </div>
  );
}
