"use client"

import { Task } from "@prisma/client";
import classes from "./TaskItem.module.scss";
import { BiSolidStar } from "react-icons/bi";
import { NotebookPen } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { convertTimestamp, getPriorityColor } from "@/lib/utils";
import clsx from "clsx";
import { completeTask, deleteTask } from "@/lib/data";
import { useEffect, useState } from "react";
import ModalError from "@/app/ui/ModalError/ModalError";
import UpdateButton from "../Buttons/UpdateButton";

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({
    task
}: TaskItemProps) {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [timeAgo, setTimeAgo] = useState('current')

    useEffect(() => {
        setTimeAgo(convertTimestamp(new Date(task.createdAt).getTime()))
    }, [])

    const completeTaskHandler = () => {
        completeTask(task.id, task.isCompleted)
            .then(result => {
                if (result === 'Failed to complete Task.') {
                    setIsError(true)
                    setMessage(result)
                }
                setIsError(true)
                setMessage('Task completed successfully.')
            })
    }

    const deleteTaskHandler = () => {
        deleteTask(task.id)
            .then(result => {
                if (result === 'Failed to delete Task.') {
                    setIsError(true)
                    setMessage(result)
                }
                setIsError(true)
                setMessage('Task deleted successfully.')
            })
    }

    return (
        <>
            {isError &&
                <ModalError
                    setIsError={setIsError}
                    selector="#modal"
                    success={true}
                >
                    {message}
                </ModalError>}

            <div className={classes.container}>
                <div className={classes.info}>
                    <h1 className={classes.title}>
                        {task.title}
                    </h1>

                    <p className={classes.description}>
                        {task.description}
                    </p>
                </div>

                <div className={classes.interactive}>
                    <span className={classes['created-at']}>
                        {timeAgo}
                    </span>

                    <span className={classes.priority} style={getPriorityColor(task.priority)}>
                        {task.priority.toLowerCase()}
                    </span>

                    <div className={classes.buttons}>
                        <BiSolidStar className={clsx(classes.star, { [classes.completed]: task.isCompleted === 'YES' })}
                            onClick={completeTaskHandler} />
                        <UpdateButton defaultState={task} />
                        <MdDelete className={classes.delete}
                            onClick={deleteTaskHandler} />
                    </div>
                </div>
            </div>
        </>
    )
}