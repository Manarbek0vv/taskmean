"use client"

import { useFormStatus } from "react-dom";
import classes from "./FormButton.module.scss";

export default function FormButton() {
    const { pending } = useFormStatus()

    return (
        <button className={classes.button} disabled={pending}>
            {
                pending ?
                    "Waiting..." :
                    "Register Now"
            }
        </button>
    )
}