import Head from "next/head";
import { getAllTags, getPostTopPage } from "@/lib/notion-api";
import SinglePost from "@/components/post/single-post";
import Link from "next/link";
import Tag from "@/components/tag/tag";
import { AllPosts, AllTags, Post } from "@/types/Post";

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
      <Head>
        <title>Jaganoer Works</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
