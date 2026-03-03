"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

interface Props {
  close: () => void;
}

interface NotificationType {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  created_at: string;
  entityId?: string;
  entityType?: string;
}

const Notification = ({ close }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<NotificationType[]>({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await axios.get("/api/notification/get");
      return res.data;
    },
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: async (id: string) => {
      await axios.patch(`/api/notification/read/${id}`);
      return id;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notification"] });

      const previous = queryClient.getQueryData<NotificationType[]>(["notification"]);

      queryClient.setQueryData<NotificationType[]>(["notification"], (old) =>
        old?.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        )
      );

      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["notification"], context.previous);
      }
    },
  });

  const handleClick = (notification: NotificationType) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    close();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="animate-spin text-white/50" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load notifications
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-white/50">
        No notifications yet
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="text-sm font-semibold text-white">
          Notifications
        </h2>
      </div>

      <div className="max-h-105 overflow-y-auto p-3 space-y-2">
        {data.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleClick(notification)}
            className={clsx(
              "relative p-4 rounded-xl border transition-all duration-200 cursor-pointer group",
              "bg-black/60 backdrop-blur-xl",
              notification.isRead
                ? "border-white/10 hover:border-white/20"
                : "border-indigo-500/40 bg-black"
            )}
          >
            {!notification.isRead && (
              <span className="absolute top-4 left-2 h-2 w-2 rounded-full bg-red-500" />
            )}

            <div className="flex justify-between items-start gap-3 pl-3">
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-white wrap-break-words">
                  {notification.title}
                </h3>
                <p className="text-sm text-white/60 mt-1 wrap-break-words">
                  {notification.message}
                </p>
              </div>

              <span className="text-xs text-white/40 whitespace-nowrap">
                {formatDistanceToNow(
                  new Date(notification.created_at),
                  { addSuffix: true }
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;