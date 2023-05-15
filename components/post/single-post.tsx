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
        <section className="border-2 border-gray-200 border-opacity-60 lg:w-1/2 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-500 text-2xl font-medium mb-2">
              <Link href={`posts/${slug}`}>{title}</Link>
            </h2>
            <div className="text-gray-500">{date}</div>
          </div>
          {tags.map((tag: string, index: number) => (
            <Link key={index} href={`/posts/tag/${tag}/page/1`}>
              <span className="text-white bg-gray-500 rounded-xl px-2 pb-1 mr-2 font-medium">
                {tag}
              </span>
            </Link>
          ))}
          <p className="text-gray-500">{description}</p>
        </section>
      )}
    </>
  );
};

export default SinglePost;
