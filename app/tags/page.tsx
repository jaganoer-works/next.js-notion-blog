import { getAllTags } from "@/lib/notion";
import Meta from "@/components/meta/meta";
import Tag from "@/components/tag/tag";

const Tags = async () => {
  const allTags = await getAllTags();
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
