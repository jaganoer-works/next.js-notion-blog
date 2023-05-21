import Link from "next/link";
import React from "react";
import { AllTags } from "@/types/types";

type TagProps = {
  tags: AllTags;
};

const Tag = (props: TagProps) => {
  const { tags } = props;

  return (
    <div className="mx-4">
      <section className="card w-full bg-primary text-primary-content p-5">
        <div className="font-medium mb-4">タグで絞り込む</div>
        <div className="flex flex-wrap gap-5">
          {tags.map((tag: string, index: number) => (
            <Link key={index} href={`/posts/tag/${tag}/page/1`}>
              <span className="badge badge-secondary p-2 mr-2">{tag}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tag;
