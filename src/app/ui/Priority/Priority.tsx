"use client"

import { Priorities, PrioritiesOrder, PriorityEnum } from "@/lib/priority.data";
import classes from "./Priority.module.scss";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Priority() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [priorityOrder, setPriorityOrder] = useState(0)

    const changePriorityHandler = (priority: PriorityEnum, index: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('priority', priority)
        router.push(pathname + '?' + params.toString())
        setPriorityOrder(index)
    }

    return (
        <div className={classes.container}>
            {Priorities.map((priority, index) => (
                <button
                    key={priority}
                    className={clsx(classes.button, {
                        [classes.active]: priorityOrder === index
                    })}
                    onClick={() => changePriorityHandler(priority, index)}
                >
                    {priority}
                </button>
            ))}
            <span
                style={{
                    transform: `translate(calc(${priorityOrder * 100}% + ${priorityOrder * 12}px))`
                }}
                className={classes.hover} />
        </div >
    )
}