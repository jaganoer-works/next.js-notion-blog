import Link from "next/link";
import React from "react";
import { getPageLink } from "./blog-helper";

type Props = {
  numberOfPage: number;
  tag: string;
  currentPage: string;
};

const Pagination = (props: Props) => {
  const { numberOfPage, tag, currentPage } = props;
  let pages: number[] = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }

  return (
    <section className="flex place-content-center mb-5">
      <div className="btn-group">
        {pages.map((page) => (
          <Link key={page} href={getPageLink(tag, page)} legacyBehavior>
            {page === Number(currentPage) ? (
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
