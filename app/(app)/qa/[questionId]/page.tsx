import AnswerContainer from "@/components/answer/AnswerContainer";

interface Props {
  params: Promise<{
    questionId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { questionId } = await params;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <AnswerContainer questionId={questionId} />
    </div>
  );
}
