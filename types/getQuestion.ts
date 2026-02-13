import { AnswerWithExtras } from "./answer";

export type QuestionDetails = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;

  likeCount: number;
  isLiked: boolean;

  user: {
    id: string;
    username: string;
    image: string | null;
  };

  answer: AnswerWithExtras[];
};
