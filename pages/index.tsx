import Head from "next/head";
import { getAllPosts } from "../lib/notion-api";
import SinglePost from "../components/post/single-post";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts,
    },
    revalidate: 10,
  };
};

export default function Home({ allPosts }) {
  console.log(allPosts);
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Notion-blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog🚀
        </h1>
        {allPosts.map((post) => (
          <div className="mx-4">
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
