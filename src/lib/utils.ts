import { Priority, Task } from "@prisma/client"
import { PriorityEnum } from "./priority.data"
import { color } from "framer-motion"

export const convertTimestamp = (timestamp: number) => {
    const seconds = Math.floor(((new Date().getTime()) - timestamp) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} ${Math.floor(seconds / 60) === 1 ? 'minute' : 'minutes'} ago`
    if (seconds < 86_400) return `${Math.floor(seconds / 3600)} ${Math.floor(seconds / 3600) === 1 ? 'hour' : 'hours'} ago`
    if (seconds < 604_800) return `${Math.floor(seconds / 86_400)} ${Math.floor(seconds / 86_400) === 1 ? 'day' : 'days'} ago`
    if (seconds < 2_592_000) return `${Math.floor(seconds / 604_800)} ${Math.floor(seconds / 604_800) === 1 ? 'week' : 'weeks'} ago`
    if (seconds < 31_104_000) return `${Math.floor(seconds / 2_592_000)} ${Math.floor(seconds / 2_592_000) === 1 ? 'month' : 'months'} ago`
    return `${Math.floor(seconds / 31_104_000)} ${Math.floor(seconds / 31_104_000) === 1 ? 'year' : 'years'} ago`
}


// --------------- Фильтрация Тасков по приоритетности --------------

export const filterTasks = (tasks: Task[], priority: string | undefined) => {
    return tasks.filter(task => {
        if (!priority || priority.toLowerCase() === PriorityEnum.ALL.toLowerCase()) return true

        return task.priority.toLocaleLowerCase() === priority.toLowerCase()
    })
}


// --------------- Цвет приоритетностей ---------------

export const getPriorityColor = (priority: Priority) => {
    if (priority === Priority.LOW) return { color: 'rgb(34, 197, 94)' }
    if (priority === Priority.MEDIUM) return { color: 'rgb(234, 179, 8)' }
    if (priority === Priority.HIGH) return { color: 'rgb(239, 68, 68)' }
    return { color: 'black' }
}