import { db } from "@/lib/db"
import { NotificationType } from "@/lib/generated/prisma/enums"

interface CreateNotificationProps {
    userId : string
    title : string
    type : NotificationType
    message : string
    entityId?: string
    entityType?: string
}

export async function CreateNotification({
    userId,
    type,
    title,
    message,
    entityId,
    entityType
    
} : CreateNotificationProps) {
    await db.notification.create({
        data:{
            userId,
            type,
            title,
            message,
            entityId,
            entityType
        }
    })
}