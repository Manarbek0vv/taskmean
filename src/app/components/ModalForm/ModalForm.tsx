"use client"

import { motion } from "framer-motion";
import { createPortal, useFormState } from "react-dom"
import classes from "./ModalForm.module.scss"
import { useEffect, useRef, useState } from "react";
import { createTaskAction, TaskState } from "@/lib/actions";
import { useSession } from "next-auth/react";
import ModalError from "@/app/ui/ModalError/ModalError";
import Button from "./Button";
import { Task } from "@prisma/client";

export default function ModalForm({
    setIsVisible,
    importedAction,
    initialState,
    type,
    defaultState
}: {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    importedAction: (_prevState: TaskState, formData: FormData) => Promise<{
        message: string;
        success: boolean;
        error?: undefined;
    } | {
        error: [string, string[]];
        message: string;
        success: boolean;
    } | {
        success: boolean;
        message?: undefined;
        error?: undefined;
    }>
    initialState: TaskState
    type: ["Create Task", "Creating..."] | ["Update Task", "Updating..."]
    defaultState?: Task
}) {
    const ref = useRef<Element | null>()
    const [mounted, setMounted] = useState(false)
    const [state, action] = useFormState(importedAction, initialState)
    const [isError, setIsError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const session = useSession()

    useEffect(() => {
        if (state.success === false) {
            setIsError(true)
        }
        if (state.success === true || isDisabled === true) {
            setIsDisabled(true)
            const timer = setTimeout(() => {
                setIsVisible(false)
            }, 150)
            return () => clearTimeout(timer)
        }
    }, [state, isDisabled])

    useEffect(() => {
        ref.current = document.querySelector('#modal')
        setMounted(true)
    }, [])

    return mounted && ref.current ? createPortal(
        <>
            {isError && <ModalError
                selector="#modal"
                setIsError={setIsError}
            >
                {
                    !state.error ?
                        state.message :
                        state.error[1][0]
                }
            </ModalError>}

            <div
                className={classes.wrapper}
                onClick={() => setIsDisabled(true)}
            >
                <motion.form
                    initial={{
                        scale: 0.05,
                    }}
                    animate={{
                        scale: isDisabled ? 0.05 : 1,
                        opacity: isDisabled ? 0 : 1
                    }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: '250',
                        duration: 0.25
                    }}
                    action={(formData: FormData) => {
                        if (!session.data) {
                            console.log('error session')
                            return
                        }
                        formData.append('authorId', session.data.user.id);
                        defaultState?.id && formData.append('id', defaultState.id.toString())
                        action(formData)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className={classes.container}
                >
                    <label
                        className={classes.label}
                        htmlFor="title">
                        Title
                        <input type="text" name="title" id="title"
                            defaultValue={defaultState?.title}
                            placeholder="Task title"
                            className={classes.input} />
                    </label>

                    <label
                        className={classes.label}
                        htmlFor="description">
                        Description
                        <textarea name="description" id="description"
                            defaultValue={defaultState?.description}
                            placeholder="Task description"
                            className={classes.textarea}
                            rows={4} />
                    </label>

                    <label
                        className={classes.label}
                        htmlFor="priority">
                        Select Priority
                        <select name="priority" id="priority" className={classes.first} defaultValue={defaultState?.priority}>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </label>

                    <label
                        className={classes.label}
                        htmlFor="dueDate">
                        Due date
                        <input type="date" name="dueDate" id="dueDate"
                            className={classes.date}
                            min={new Date().toISOString().split('T')[0]}
                            defaultValue={String(defaultState?.dueDate).split('T')[0]} />
                    </label>

                    <label
                        className={classes.label}
                        htmlFor="isCompleted">
                        Task Completed
                        <div className={classes.completed}>
                            Completed
                            <select name="isCompleted" id="isCompleted" className={classes.second} defaultValue={defaultState?.isCompleted}>
                                <option value="NO">No</option>
                                <option value="YES">Yes</option>
                            </select>
                        </div>
                    </label>

                    <Button type={type} />
                </motion.form>
            </div>
        </>,
        ref.current
    ) :
        null
}