import { getNumberOfPagesByTag, getPostByTagAndPage } from "@/lib/notion";
import { Post } from "@/types/types";
import SinglePost from "@/components/post/single-post";
import Pagination from "@/components/pagination/pagination";
import Meta from "@/components/meta/meta";

type BlogTagPageListProps = {
  params: {
    tag: string;
    page: string;
  };
};

export default async function BlogTagPageList({
  params,
}: BlogTagPageListProps) {
  const posts = await getPostByTagAndPage(params.tag, Number(params.page));
  const currentTag = params.tag;
  const currentPage = params.page;
  const numberOfPageByTag = await getNumberOfPagesByTag(params.tag);
  return (
    <div className="container h-full w-full mx-auto">
      <Meta
        pageTitle={`${currentTag}の検索結果`}
        pageDesc={`${currentTag}の検索結果`}
      />

      <main className="container lg:w-5/6 mx-auto mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">{`${currentTag}の検索結果`}</h1>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 mb-5">
          {posts.map((post: Post) => (
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
          numberOfPage={numberOfPageByTag}
          tag={currentTag}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}
