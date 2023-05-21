import Link from "next/link";
import React from "react";

type SinglePostProps = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
};

const SinglePost = (props: SinglePostProps) => {
  const { title, description, date, tags, slug } = props;
  return (
    <div className="card w-full bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">
          <Link href={`/posts/${slug}`}>{title}</Link>
        </h2>
        <p>{description}</p>
        <div className="text-right mb-2">
          {tags.map((tag: string, index: number) => (
            <Link key={index} href={`/posts/tag/${tag}/page/1`}>
              <span className="badge badge-secondary p-2 mr-2">{tag}</span>
            </Link>
          ))}
        </div>
        <div className="stat-desc text-right">{date}</div>
      </div>
    </div>
  );
};

export default SinglePost;
