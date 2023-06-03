import { getAllTags, getNumberOfPages, getPostByPage } from "@/lib/notion";
import { AllTags, Post } from "@/types/types";
import { GetStaticPropsContext } from "next";
import SinglePost from "@/components/post/single-post";
import Tag from "@/components/tag/tag";
import Pagination from "@/components/pagination/pagination";
import Meta from "@/components/meta/meta";

export const getStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages();

  let params = [];
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (context.params === undefined) {
    throw new Error("context.params is undefined");
  }

  if (context.params.page === undefined) {
    throw new Error("context.params.page is undefined");
  }

  const currentPage = context.params.page;
  const postsByPage = await getPostByPage(parseInt(currentPage.toString(), 10));
  const numberOfPage = await getNumberOfPages();
  const allTags = await getAllTags();

  if (process.env.REVALIDATE_TIME === undefined) {
    throw new Error("REVALIDATE_TIME is not defined");
  }

  return {
    props: {
      postsByPage,
      numberOfPage,
      allTags,
      currentPage: parseInt(currentPage.toString(), 10),
    },
    revalidate: parseInt(process.env.REVALIDATE_TIME, 10),
  };
};

type Props = {
  postsByPage: Post[];
  numberOfPage: number;
  allTags: AllTags;
  currentPage: number;
};

export default function BlogPageList({
  postsByPage,
  numberOfPage,
  allTags,
  currentPage,
}: Props) {
  return (
    <div className="container h-full w-full mx-auto">
      <Meta />

      <main className="container lg:w-5/6 mx-auto mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Blogs</h1>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 mb-5">
          {postsByPage.map((post: Post) => (
            <SinglePost
              key={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          ))}
        </section>
        <Pagination
          numberOfPage={numberOfPage}
          tag={""}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}
