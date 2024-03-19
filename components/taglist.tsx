import React from "react";
import { Badge } from "./ui/badge";

export const splitTags = (tags: string) =>
  tags.split(",").map((tag) => tag.trim());
function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tags.map((lang) => (
        <Badge key={lang}>{lang}</Badge>
      ))}
    </div>
  );
}

export default TagList;
