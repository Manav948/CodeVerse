"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Bell, CheckCheck } from "lucide-react";
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
        old?.map((n) => (n.id === id ? { ...n, isRead: true } : n))
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

  const unreadCount = data?.filter((n) => !n.isRead).length ?? 0;


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-9 px-6">
        <Loader2 size={18} className="animate-spin text-white/20" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-6 px-4 text-center text-[13px] text-red-500/70 font-medium">
        Failed to load notifications
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2.5 py-11 px-6 text-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/4 border border-white/[0.07]">
          <Bell size={18} className="text-white/30" />
        </div>
        <p className="text-[13px] text-white/40 font-medium m-0">No notifications</p>
        <p className="text-[12px] text-white/20 m-0">You&apos;re all caught up</p>
      </div>
    );
  }

  return (
    <div className="w-full select-none">
 
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
        <div className="flex items-center gap-2">
          <h2 className="text-[13px] font-semibold text-white/90 tracking-tight m-0">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-4.5 h-4.5 px-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-semibold text-red-400 tracking-wide">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
        {unreadCount === 0 && (
          <CheckCheck size={14} className="text-white/20" />
        )}
      </div>

      
      <div className="max-h-100 overflow-y-auto p-1.5 space-y-0.5">
        {data.map((notification, idx) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={() => handleClick(notification)}
            isLast={idx === data.length - 1}
          />
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="py-2.5 px-4 border-t border-white/6 flex items-center justify-center">
        <span className="text-[10px] text-white/25 tracking-wider font-semibold uppercase">
          Recent activity
        </span>
      </div>
    </div>
  );
};


interface ItemProps {
  notification: NotificationType;
  onClick: () => void;
  isLast: boolean;
}

const NotificationItem = ({ notification, onClick, isLast }: ItemProps) => {
  const timeLabel = formatDistanceToNow(new Date(notification.created_at), {
    addSuffix: true,
  });

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={clsx(
        "relative flex items-start gap-2.5 p-3 rounded-lg cursor-pointer transition-all duration-150 outline-none",
        isLast ? "mb-0" : "mb-0.5",
        notification.isRead
          ? "bg-transparent border border-transparent hover:bg-white/3"
          : "bg-white/2 border border-white/ hover:bg-white/"
      )}
    >
      {/* Unread indicator dot */}
      <div
        className={clsx(
          "shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full transition-all duration-200",
          notification.isRead
            ? "bg-white/10"
            : "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.25)]"
        )}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h3
            className={clsx(
              "m-0 text-[13px] tracking-tight leading-normal wrap-break-words",
              notification.isRead
                ? "font-medium text-white/60"
                : "font-semibold text-white/90"
            )}
          >
            {notification.title}
          </h3>

          <span className="shrink-0 text-[11px] font-medium text-white/25 pt-0.5">
            {timeLabel}
          </span>
        </div>

        {notification.message && (
          <p className="mt-1 mb-0 text-[12px] text-white/40 leading-relaxed wrap-break-words">
            {notification.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Notification;