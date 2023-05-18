import Link from "next/link";
import React from "react";
import { getPageLink } from "./pagination/blog-helper";

type Props = {
  numberOfPage: number;
  tag: string;
  currentPage: number;
};

const Pagination = (props: Props) => {
  const { numberOfPage, tag, currentPage } = props;

  let pages: number[] = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }

  const isCurrentPage = (page: number) => {
    if (page === currentPage) {
      return "bg-white border border-gray-500 rounded-lg w-10 h-10 text-gray-500 relative";
    }
    return "bg-blue-500 rounded-lg w-10 h-10 text-gray-100 relative hover:bg-white hover:text-gray-500 hover:border hover:border-gray-500";
  };

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((page) => (
          <li key={page} className={isCurrentPage(page)}>
            <Link
              href={getPageLink(tag, page)}
              className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
