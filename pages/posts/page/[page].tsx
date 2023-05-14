import Head from "next/head";
import {
  getAllTags,
  getNumberOfPages,
  getPostByPage,
} from "../../../lib/notion-api";
import SinglePost from "../../../components/post/single-post";
import Pagination from "../../../components/pagination/Pagination";
import Tag from "../../../components/tag/tag";

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

export const getStaticProps = async (context: { params: { page: any } }) => {
  const currentPage = context.params?.page;
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
    },
    revalidate: parseInt(process.env.REVALIDATE_TIME, 10),
  };
};

export default function BlogPageList({ postsByPage, numberOfPage, allTags }) {
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
          {postsByPage.map((post) => (
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
        <Pagination numberOfPage={numberOfPage} tag={""} />
        <Tag tags={allTags} />
      </main>
    </div>
  );
}
