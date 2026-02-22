import UpdateTaskContainer from "@/components/task/update/UpdateTaskContainer";

interface Props {
  params: Promise<{ taskId: string }>;
}

const Page = async({ params }: Props) => {
  const { taskId } = await params;

  return (
    <div className="bg-black text-white min-h-screen">
      <UpdateTaskContainer taskId={taskId} />
    </div>
  );
};

export default Page;