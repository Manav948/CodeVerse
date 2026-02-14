import { ArticleWithExtras } from "./article";
import { PostWithExtras } from "./post";
import { QuestionWithExtras } from "./question";
import { SnippetWithExtras } from "./snippet";

export type BookmarkItem =
  | { type: "post"; data: PostWithExtras }
  | { type: "snippet"; data: SnippetWithExtras }
  | { type: "question"; data: QuestionWithExtras }
  | { type: "article"; data: ArticleWithExtras };
