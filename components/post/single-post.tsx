import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPagination: boolean;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPagination } = props;

  return (
    <>
      {isPagination ? (
        <section className="bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="lg:flex items-center">
            <h2 className="text-gray-100 text-2xl font-medium mb-2 mr-2">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className="text-gray-100 mr-2">{date}</div>
            {tags.map((tag: string, index: number) => (
              <Link key={index} href={`/posts/tag/${tag}/page/1`}>
                <span className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium mr-2">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </section>
      ) : (
        <section className="border border-solid border-gray-200 rounded-md p-5 bg-white">
          <h2 className="text-gray-900 text-2xl mb-2 font-bold">
            <Link href={`posts/${slug}`}>{title}</Link>
          </h2>
          <div className="text-gray-900 mb-2">{description}</div>
          <div className="text-right mb-2">
            {tags.map((tag: string, index: number) => (
              <Link key={index} href={`/posts/tag/${tag}/page/1`}>
                <span className="text-white bg-gray-500 rounded-xl px-2 pb-1 mr-2 font-medium">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-gray-900 text-right">{date}</div>
        </section>
      )}
    </>
  );
};

export default SinglePost;
