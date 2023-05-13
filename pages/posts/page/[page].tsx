import Head from "next/head";
import { getPostByPage, getPostTopPage } from "../../../lib/notion-api";
import SinglePost from "../../../components/post/single-post";

export const getStaticPaths = async () => {
  const numberOfPage = await getPostTopPage();

  let params = [];
  for (let i = 1; i <= numberOfPage.length; i++) {
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

  return {
    props: {
      postsByPage,
    },
    revalidate: 60 * 60 * 6,
  };
};

export default function BlogPageList({ postsByPage }) {
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
            <div>
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
      </main>
    </div>
  );
}
