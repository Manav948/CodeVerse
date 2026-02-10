"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../ui/Loading";
import Question from "./Question";

const AllQuestion = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["question"],
    queryFn: async () => {
      const res = await axios.get("/api/Question/getAll");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center text-white/50">
        <Loader />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="py-20 text-center text-white/50">
        No Question found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {data.map((question: any) => (
        <Question key={question.id} question={question}/>
      ))}
    </div>
  );
};

export default AllQuestion;
