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
