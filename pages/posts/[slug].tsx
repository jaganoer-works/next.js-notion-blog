import React from "react";
import { getAllPosts, getSingePost } from "../../lib/notion-api";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";

export const getStaticPaths = async () => {
  const allPost = await getAllPosts();
  const paths = allPost.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
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
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-2"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string) => (
        <p className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 mr-2 inline-block">
          {tag}
        </p>
      ))}
      <div className="markdown mt-10 font-medium">
        <ReactMarkdown
          children={post.markdown.parent}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />

        <Link href="/">
          <span className="pb-20 block mt-3 text-sky-900">←ホームへ戻る</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;
