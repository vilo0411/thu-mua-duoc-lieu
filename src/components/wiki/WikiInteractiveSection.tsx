import React from "react";
import type { WikiArticle } from "../../types";
import { getWikiInteractiveComponent } from "../../lib/wikiComponentMap";

interface Props {
  article: WikiArticle;
}

export const WikiInteractiveSection: React.FC<Props> = ({ article }) => {
  const Component = getWikiInteractiveComponent(article);
  if (!Component) return null;

  return (
    <div className="my-8">
      <Component article={article} />
    </div>
  );
};
