"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

const Notification = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
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

      const previous = queryClient.getQueryData<any[]>(["notification"]);

      queryClient.setQueryData<any[]>(["notification"], (old) =>
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

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  const handleClick = (notification: any) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    close(); // close dropdown instantly

    if (notification.entityId && notification.entityType) {
      router.push(
        `/${notification.entityType.toLowerCase()}/${notification.entityId}`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="animate-spin text-white/60" />
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
      <div className="p-10 text-center text-white/50">
        No notifications yet
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 p-4">
      {data.map((notification: any) => (
        <div
          key={notification.id}
          onClick={() => handleClick(notification)}
          className={clsx(
            "p-4 rounded-xl border cursor-pointer transition-all duration-200",
            "bg-black/60 backdrop-blur-xl hover:border-white/20",
            notification.isRead
              ? "border-white/10"
              : "border-indigo-500/40 bg-indigo-500/10"
          )}
        >
          <div className="flex justify-between items-start gap-3">
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

          {!notification.isRead && (
            <div className="mt-2 text-xs text-indigo-400 font-medium ">
              Unread
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notification;