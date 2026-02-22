export type Task = {
  id: string;
  title: string;
  content: string;
  dueDate?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  created_at: string;
};