"use client"

import { useFormStatus } from "react-dom"
import classes from "./ModalForm.module.scss"

export default function Button({ type }: {
    type: ["Create Task", "Creating..."] | ["Update Task", "Updating..."]
}) {
    const { pending } = useFormStatus()

    return (
        <button className={classes.button} disabled={pending}>
            {
                pending ?
                    type[1] :
                    type[0]
            }
        </button>
    )
}