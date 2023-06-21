import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostByTagAndPage,
} from "@/lib/notion";
import { GetStaticPropsContext } from "next";
import { AllTags, Post } from "@/types/types";
import SinglePost from "@/components/post/single-post";
import Pagination from "@/components/pagination/pagination";
import Meta from "@/components/meta/meta";

type Params = {
  params: {
    tag: string;
    page: string;
  };
};

export const getStaticPaths = async () => {
  const allTags = await getAllTags();

  let params: Params[] = [];

  await Promise.all(
    allTags.map((tag) => {
      return getNumberOfPagesByTag(tag).then((numberOfPageByTag) => {
        for (let i = 1; i <= numberOfPageByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } });
        }
      });
    })
  );

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

  if (context.params.tag === undefined) {
    throw new Error("context.params.tag is undefined");
  }

  const currentPage = context.params.page.toString();
  const currentTag = context.params.tag.toString();

  const upperCaseCurrentTag =
    currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

  const posts = await getPostByTagAndPage(
    upperCaseCurrentTag,
    parseInt(currentPage)
  );

  const numberOfPageByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);
  const allTags = await getAllTags();

  if (process.env.REVALIDATE_TIME === undefined) {
    throw new Error("REVALIDATE_TIME is not defined");
  }

  return {
    props: {
      posts,
      numberOfPageByTag,
      currentTag,
      allTags,
      currentPage: parseInt(currentPage, 10),
    },
    revalidate: parseInt(process.env.REVALIDATE_TIME, 10),
  };
};

type Props = {
  posts: Post[];
  numberOfPageByTag: number;
  currentTag: string;
  allTags: AllTags;
  currentPage: number;
};

export default function BlogTagPageList({
  numberOfPageByTag,
  posts,
  currentTag,
  currentPage,
}: Props) {
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
