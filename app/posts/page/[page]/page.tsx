import { getNumberOfPages, getPostByPage } from "@/lib/notion";
import { Post } from "@/types/types";
import SinglePost from "@/components/post/single-post";
import Pagination from "@/components/pagination/pagination";
import Meta from "@/components/meta/meta";

type Params = {
  params: {
    page: string;
  };
};

export default async function BlogPageList({ params }: Params) {
  const currentPage = params.page;
  const postsByPage = await getPostByPage(parseInt(currentPage.toString(), 10));
  const numberOfPage = await getNumberOfPages();
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
