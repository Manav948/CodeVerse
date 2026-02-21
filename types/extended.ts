export type CalendarItem = {
    id: string,
    title: string,
    dueDate: string | Date,
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED",
    priority: "LOW" | "MEDIUM" | "HIGH"
};