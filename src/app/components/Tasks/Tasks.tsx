import classes from "./Tasks.module.scss";
import { Task } from "@prisma/client";
import TaskItem from "../TaskItem/TaskItem";
import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";
import { filterTasks } from "@/lib/utils";
import CreateButton from "../Buttons/CreateButton";


export default async function Tasks({
    callback,
    priority
}: {
    callback: (authorId: number) => Promise<Task[] | 'Failed to fetch Tasks.'>
    priority?: string
}) {
    const session = await getServerSession(authConfig)

    if (!session?.user) throw new Error('Something went wrong.')

    const tasks = await callback(Number(session.user.id))

    if (!tasks) throw new Error('Something went wrong.')
    if (tasks === 'Failed to fetch Tasks.') throw new Error(tasks)

    const filteredTasks = filterTasks(tasks, priority)

    return (
        <div className={classes.container}>
            {filteredTasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
            <CreateButton />
        </div>
    )
}