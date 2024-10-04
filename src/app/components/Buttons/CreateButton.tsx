"use client"

import { useState } from "react";
import classes from "./Button.module.scss";
import ModalForm from "../ModalForm/ModalForm";
import { createTaskAction, TaskState } from "@/lib/actions";

const initialState: TaskState = {
    success: null,
}

export default function CreateButton() {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            {isVisible &&
                <ModalForm
                    initialState={initialState}
                    importedAction={createTaskAction}
                    setIsVisible={setIsVisible}
                    type={["Create Task", "Creating..."]} />
            }

            <button onClick={() => setIsVisible(true)} className={classes.container}>
                Add New Task
            </button>
        </>
    )
}