import { Key } from "react";

export type Post = {
  id: Key | null | undefined;
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
};

export type AllPosts = {
  map(arg0: (post: Post) => JSX.Element): import("react").ReactNode;
  allPosts: Post[];
};

export type AllTags = {
  map(
    arg0: (tag: string, index: number) => JSX.Element
  ): import("react").ReactNode;
  allTags: string[];
};
