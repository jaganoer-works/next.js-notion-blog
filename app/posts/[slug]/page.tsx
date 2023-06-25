import { getSingePost } from "@/lib/notion";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Link from "next/link";
import Meta from "@/components/meta/meta";

const Post = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const post = await getSingePost(params.slug);
  return (
    <>
      <Meta
        pageTitle={post.metadata.title}
        pageDesc={post.metadata.description}
      />
      <section className="container lg:px-5 px-5 lg:w-3/5 mx-auto mt-20">
        <h1 className="w-full text-3xl font-bold">{post.metadata.title}</h1>
        <div className="border-b-2 mb-5"></div>
        <div className="text-right mb-2">
          {post.metadata.tags.map((tag: string, index: number) => (
            <div key={index} className="badge badge-secondary p-2 mr-2">
              <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
            </div>
          ))}
        </div>
        <div className="stat-desc text-right text-lg mb-10">
          {post.metadata.date}
        </div>
        <div className="prose prose-xl mx-auto w-full">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={monokai}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code>{children}</code>
                );
              },
            }}
          >
            {post.markdown.parent}
          </ReactMarkdown>

          <Link href="/">
            <span className="link link-info pb-20 block mt-3 text-right">
              ←ホームへ戻る
            </span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Post;
