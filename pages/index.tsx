import { getAllTags, getPostTopPage } from "@/lib/notion-api";
import Link from "next/link";
import { AllPosts, AllTags, Post } from "@/types/post";
import Tag from "@/components/tag/tag";
import SinglePost from "@/components/post/single-post";
import Meta from "@/components/meta/meta";

export const getStaticProps = async () => {
  const allPosts = await getPostTopPage();
  const allTags = await getAllTags();

  if (!process.env.REVALIDATE_TIME) {
    throw new Error("REVALIDATE_TIME is not defined");
  }

  return {
    props: {
      allPosts,
      allTags,
    },
    revalidate: parseInt(process.env.REVALIDATE_TIME, 10),
  };
};

type Props = {
  allPosts: AllPosts;
  allTags: AllTags;
};

export default function Home({ allPosts, allTags }: Props) {
  return (
    <div className="container h-full w-full mx-auto">
      <Meta pageTitle="Home" />

      <main className="container lg:w-5/6 mx-auto mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Blogs</h1>
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
          className="mb-6 mx-auto px-5 block text-right"
        >
          ...もっと見る
        </Link>
        <Tag tags={allTags} />
      </main>
    </div>
  );
}
