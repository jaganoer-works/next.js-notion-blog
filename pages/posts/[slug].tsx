import React from "react";
import { getSingePost } from "../../lib/notion-api";

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: "first-post" } },
      { params: { slug: "second-post" } },
      { params: { slug: "third-post" } },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getSingePost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

const Post = ({ post }) => {
  console.log(post);

  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">３回目の投稿です。</h2>
      <div className="border-b-2"></div>
      <span className="text-gray-500">2023/4/19</span>
      <br />
      <p className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block">
        Next.js
      </p>
      <div className="mt-10">aaaadfaodkjaojdaijdioajdjaoijdoajij</div>
    </section>
  );
};

export default Post;
