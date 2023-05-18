import Head from "next/head";
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostByTagAndPage,
} from "@/lib/notion-api";
import SinglePost from "@/components/post/single-post";
import Pagination from "@/components/pagination/pagination";
import Tag from "@/components/tag/tag";
import { GetStaticPropsContext } from "next";
import { AllTags, Post } from "@/types/Post";

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
  allTags,
  currentPage,
}: Props) {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Notion-blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16 mx-auto">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog</h1>
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {posts.map((post: Post) => (
            <div key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPagination={true}
              />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={numberOfPageByTag} tag={currentTag} currentPage={currentPage} />
        <Tag tags={allTags} />
      </main>
    </div>
  );
}
