"use client"

import classes from "./error.module.scss"

export default function Error({
    error,
    reset
}: {
    error: Error
    reset: () => void
}) {

    return (
        <h1 className={classes.h}>{error.message}</h1>
    )
}