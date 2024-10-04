"use client"

import classes from './Button.module.scss';
import { TaskState, updateTaskAction } from "@/lib/actions"
import { NotebookPen } from 'lucide-react';
import { useState } from "react"
import ModalForm from '../ModalForm/ModalForm';
import { Task } from '@prisma/client';

const initialState: TaskState = {
    success: null,
}

export default function UpdateButton({ defaultState }: {
    defaultState: Task
}) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            {isVisible &&
                <ModalForm
                    initialState={initialState}
                    importedAction={updateTaskAction}
                    setIsVisible={setIsVisible}
                    type={["Update Task", "Updating..."]}
                    defaultState={defaultState} />
            }

            <NotebookPen onClick={() => setIsVisible(true)} className={classes.edit} />
        </>
    )
}