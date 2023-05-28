import { getAllPosts, getSingePost } from "@/lib/notion";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
import Meta from "@/components/meta/meta";

type PostProps = {
  post: {
    metadata: {
      title: string;
      description: string;
      date: string;
      tags: string[];
    };
    markdown: {
      parent: string;
    };
  };
};

const Post = ({ post }: PostProps) => {
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
        <div className="prose prose-lg mx-auto">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={okaidia}
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

export const getStaticPaths = async () => {
  const allPost = await getAllPosts();
  const paths = allPost.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const post = await getSingePost(params.slug);

  if (!process.env.REVALIDATE_TIME) {
    throw new Error("REVALIDATE_TIME is not defined");
  }

  return {
    props: {
      post,
    },
    revalidate: parseInt(process.env.REVALIDATE_TIME, 10),
  };
};
