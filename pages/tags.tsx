import { getAllTags } from "@/lib/notion";
import Meta from "@/components/meta/meta";
import Tag from "@/components/tag/tag";
import { AllTags } from "@/types/types";

export const getStaticProps = async () => {
  const allTags = await getAllTags();

  if (!process.env.REVALIDATE_TIME) {
    throw new Error("REVALIDATE_TIME is not defined");
  }

  return {
    props: {
      allTags,
    },
    revalidate: parseInt(process.env.REVALIDATE_TIME, 10),
  };
};

type TagsProps = {
  allTags: AllTags;
};

const Tags = ({ allTags }: TagsProps) => {
  return (
    <div className="container h-full w-full mx-auto">
      <Meta pageTitle="Tags" />

      <main className="container lg:w-5/6 mx-auto mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Tags</h1>
        <Tag tags={allTags} />
      </main>
    </div>
  );
};

export default Tags;
