import Link from "next/link";
import React from "react";
import { getPageLink } from "./blog-helper";

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

  // const isCurrentPage = (page: number) => {
  //   if (page === currentPage) {
  //     return "bg-white border border-gray-500 rounded-lg w-10 h-10 text-gray-500 relative";
  //   }
  //   return "bg-blue-500 rounded-lg w-10 h-10 text-gray-100 relative hover:bg-white hover:text-gray-500 hover:border hover:border-gray-500";
  // };

  return (
    <section className="flex place-content-center mb-5">
      <div className="btn-group">
        {pages.map((page) => (
          <Link key={page} href={getPageLink(tag, page)} legacyBehavior>
            {page === currentPage ? (
              <a className="btn btn-active">{page}</a>
            ) : (
              <a className="btn">{page}</a>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Pagination;
