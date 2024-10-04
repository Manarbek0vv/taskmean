"use server"

import { z } from "zod";
import { createTask, createUser, fetchUser, updateTask } from "./data";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";


// ------------- Создание пользователя для формы ---------------

const RegUserSchema = z.object({
    name: z.string({
        required_error: 'Required field missing.',
        invalid_type_error: 'Name must be a string.'
    })
        .min(4, { message: 'Name is too short.' })
        .max(40, { message: 'Name is too long.' })
    ,
    email: z.string({
        required_error: 'Required field missing.',
        invalid_type_error: 'Email must be a string.'
    })
        .email({ message: 'Incorrect email syntax.' })
    ,
    password: z.string({
        required_error: 'Required field missing.',
        invalid_type_error: 'Password must be a string.'
    })
        .min(6, { message: 'Password is too short.' })
        .max(30, { message: 'Password is too long.' })
})

export type RegState = {
    error?: [string, string[]]
    message?: string | null;
    success: boolean | null;
    response?: Omit<User, 'password'>;
};

export const createUserAction = async (_prevState: RegState, formData: FormData) => {

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const validatedFields = RegUserSchema.safeParse(data)

    if (!validatedFields.success) {
        return {
            error: Object.entries(validatedFields.error.flatten().fieldErrors)[0],
            message: 'Missing Fields. Failed to registration.',
            success: false,
        }
    }

    const createdUser = await createUser(validatedFields.data)

    if (!createdUser) {
        return {
            message: 'Something went wrong, server error.',
            success: false,
        }
    }
    if (typeof createdUser === 'string') {
        return {
            message: createdUser,
            success: false,
        }
    }

    const { password, ...userWithOutPassword } = createdUser

    return {
        success: true,
        response: userWithOutPassword
    }
}


// --------------- Авторизация пользователя для формы ---------------

const LogUserSchema = z.object({
    email: z.string({
        required_error: 'Required field missing.',
        invalid_type_error: 'Email must be a string.'
    })
        .email({ message: 'Incorrect email syntax.' })
    ,
    password: z.string({
        required_error: 'Required field missing.',
        invalid_type_error: 'Password must be a string.'
    })
        .min(6, { message: 'Password is too short.' })
        .max(30, { message: 'Password is too long.' })
})

export type LogState = {
    error?: [string, string[]]
    message?: string | null;
    success: boolean | null;
    response?: Omit<User, 'password'>;
};

export const loginUserAction = async (_prevState: LogState, formData: FormData) => {

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const validatedFields = LogUserSchema.safeParse(data)

    if (!validatedFields.success) {
        return {
            error: Object.entries(validatedFields.error.flatten().fieldErrors)[0],
            message: 'Missing Fields. Failed to login.',
            success: false,
        }
    }

    const fetchedUser = await fetchUser(data.email as string)

    if (!fetchedUser) {
        return {
            message: 'Something went wrong, user not found or server error.',
            success: false,
        }
    }

    if (data.password !== fetchedUser.password) {
        const errorName: [string, string[]] = ['password', ['Wrong password.']]

        return {
            error: errorName,
            message: 'Missing Fields. Failed to login.',
            success: false,
        }
    }

    const { password, ...userWithOutPassword } = fetchedUser

    return {
        success: true,
        response: userWithOutPassword
    }
}


// --------------- Создание Таска для формы ---------------

const TaskSchema = z.object({
    title: z.string({
        required_error: 'Required field missing.',
        invalid_type_error: 'Title must be a string.'
    })
        .min(1, { message: 'Title cannot be missing.' })
        .max(50, { message: 'Title is too long.' })
    ,
    description: z.string({
        required_error: 'Required field missing.',
        invalid_type_error: 'Description must be a string.'
    })
        .min(1, { message: 'Description cannot be missing.' })
        .max(100, { message: 'Description is too long.' })
    ,
    authorId: z.number({
        required_error: 'Something went wrong..',
        invalid_type_error: 'Author id must be a number.'
    })
    ,
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH'])
    ,
    dueDate: z.string().datetime({})
    ,
    isCompleted: z.enum(['NO', 'YES']),
})

// enum PriorityObject {
//     Low = 'LOW',
//     Medium = 'MEDIUM',
//     High = 'HIGH',
// }

// enum CompletedObject {
//     No = 'NO',
//     Yes = 'YES',
// }

export type TaskState = {
    error?: [string, string[]]
    message?: string | null;
    success: boolean | null;
};

export const createTaskAction = async (_prevState: TaskState, formData: FormData) => {

    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        authorId: Number(formData.get('authorId')),
        priority: formData.get('priority'),
        dueDate: formData.get('dueDate') as string,
        isCompleted: formData.get('isCompleted'),
    }

    if (!data.dueDate) {
        return {
            message: 'Due date required  field.',
            success: false,
        }
    }

    const validatedFields = TaskSchema.safeParse({
        ...data,
        dueDate: new Date(data.dueDate).toISOString()
    })

    if (!validatedFields.success) {
        return {
            error: Object.entries(validatedFields.error.flatten().fieldErrors)[0],
            message: 'Missing Fields. Failed to create Task.',
            success: false,
        }
    }

    const task = await createTask({
        ...validatedFields.data,
        dueDate: new Date(validatedFields.data.dueDate)
    })

    if (!task || task === 'Something went wrong.') {
        return {
            success: false,
            message: task
        }
    }

    revalidatePath('/')
    revalidatePath('/completed')
    revalidatePath('/pending')
    revalidatePath('/overdue')

    return {
        success: true
    }
}

export const updateTaskAction = async (_prevState: TaskState, formData: FormData) => {

    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        authorId: Number(formData.get('authorId')),
        priority: formData.get('priority'),
        dueDate: formData.get('dueDate') as string,
        isCompleted: formData.get('isCompleted'),
    }

    if (!data.dueDate) {
        return {
            message: 'Due date required  field.',
            success: false,
        }
    }

    const validatedFields = TaskSchema.safeParse({
        ...data,
        dueDate: new Date(data.dueDate).toISOString()
    })

    if (!validatedFields.success) {
        return {
            error: Object.entries(validatedFields.error.flatten().fieldErrors)[0],
            message: 'Missing Fields. Failed to create Task.',
            success: false,
        }
    }

    const task = await updateTask({
        ...validatedFields.data,
        dueDate: new Date(validatedFields.data.dueDate),
        id: Number(formData.get('id'))
    })

    if (!task || task === 'Something went wrong.') {
        return {
            success: false,
            message: task
        }
    }

    revalidatePath('/')
    revalidatePath('/completed')
    revalidatePath('/pending')
    revalidatePath('/overdue')

    return {
        success: true
    }
}