"use server"

import { Task, User } from "@prisma/client"
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from '../lib/prisma'

// --------------- Создание пользователя --------------

export const createUser = async (userData: Omit<User, 'id'>) => {
    try {
        const newUser = await prisma.user.create({
            data: userData
        })

        return newUser
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return 'This email is already registered.'
            }
        }
        console.log(error)
    }
}

// --------------- Получить пользователя ---------------

export const fetchUser = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        return user
    } catch (error) {
        console.log(error)
    }
}

// --------------- Создать Таск --------------

export const createTask = async (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    try {
        return await prisma.task.create({
            data: newTask,
        })
    } catch (error) {
        return 'Something went wrong.'
    }
}


// --------------- Получить Таск ---------------

export const fetchTask = async (id: number) => {
    try {
        return await prisma.task.findUnique({
            where: { id }
        })
    } catch (error) {
        return 'Something went wrong.'
    }
}

// --------------- Создать Таск --------------

export const updateTask = async (newTask: Omit<Task, 'createdAt'>) => {
    try {
        return await prisma.task.update({
            where: { id: newTask.id },
            data: newTask,
        })
    } catch (error) {
        return 'Something went wrong.'
    }
}

// --------------- Получить количество активных Тасков --------------

export const fetchActiveTasksCount = unstable_cache(
    async (authorId: number) => {
        try {
            return await prisma.task.count({
                where: {
                    authorId,
                    isCompleted: 'NO',
                    dueDate: {
                        gte: new Date().toISOString()
                    }
                }
            })
        } catch (_error) {
            return 0
        }
    },
    ['activetasks'],
)


// --------------- Получить количество всех Тасков --------------

export const fetchTotalTasksCount = unstable_cache(
    async (authorId: number) => {
        try {
            return await prisma.task.count({
                where: { authorId }
            })
        } catch (_error) {
            return 0
        }
    },
    ['totaltasks'],
)


// --------------- Получить количество просроченных Тасков --------------

export const fetchOverdueTasksCount = unstable_cache(
    async (authorId: number) => {
        try {
            return await prisma.task.count({
                where: {
                    authorId,
                    isCompleted: 'NO',
                    dueDate: {
                        lte: new Date().toISOString()
                    }
                }
            })
        } catch (_error) {
            return 0
        }
    },
    ['overduetasks'],
)
// --------------- Получить количество Тасков --------------

export const fetchCompletedTasksCount = unstable_cache(
    async (authorId: number) => {
        try {
            return await prisma.task.count({
                where: {
                    authorId,
                    isCompleted: 'YES',
                }
            })
        } catch (_error) {
            return 0
        }
    },
    ['completedtasks'],
)


// --------------- Получить все Таски пользователя по id ----------------

export const fetchAllTasks = unstable_cache(
    async (authorId: number) => {
        try {
            return await prisma.task.findMany({
                where: { authorId },
            })
        } catch (error) {
            return 'Failed to fetch Tasks.'
        }
    },
    ['alltasks'],
)
// --------------- Получить все выполненные Таски пользователя по id ---------------

export const fetchCompletedTasks = unstable_cache(
    async (authorId: number) => {
        try {
            return await prisma.task.findMany({
                where: {
                    authorId,
                    isCompleted: 'YES',
                }
            })
        } catch (error) {
            return 'Failed to fetch Tasks.'
        }
    },
    ['completedtasks'],
)

// --------------- Получить все ожидаемые Таски пользователя по id ---------------

export const fetchPendingTasks = unstable_cache(
    async (authorId: number) => {
        try {
            return await prisma.task.findMany({
                where: {
                    authorId,
                    isCompleted: 'NO',
                    dueDate: {
                        gte: new Date().toISOString()
                    }
                }
            })
        } catch (error) {
            return 'Failed to fetch Tasks.'
        }
    },
    ['pendingtasks'],
)

// --------------- Получить все просроченные Таски пользователя по id ---------------

export const fetchOverdueTasks = unstable_cache(
    async (authorId: number) => {
        try {
            return await prisma.task.findMany({
                where: {
                    authorId,
                    isCompleted: 'NO',
                    dueDate: {
                        lte: new Date().toISOString()
                    }
                }
            })
        } catch (error) {
            return 'Failed to fetch Tasks.'
        }
    },
    ['overduetasks'],
)

// --------------- Выполнить Таск ---------------

export const completeTask = async (id: number, completed: Task['isCompleted']) => {
    try {
        const result = await prisma.task.update({
            where: { id },
            data: { isCompleted: completed === 'YES' ? 'NO' : 'YES' }
        })

        if (!result) return 'Failed to complete Task.'

        revalidatePath('/')
        revalidatePath('/completed')
        revalidatePath('/pending')
        revalidatePath('/overdue')
        return result
    } catch (error) {
        return 'Failed to complete Task.'
    }
}

// --------------- Удалить Таск ---------------

export const deleteTask = async (id: number) => {
    try {
        const result = prisma.task.delete({
            where: { id }
        })

        if (!result) return 'Failed to delete Task.'

        revalidatePath('/')
        revalidatePath('/completed')
        revalidatePath('/pending')
        revalidatePath('/overdue')
        return result
    } catch (error) {
        return 'Failed to delete Task.'
    }
}