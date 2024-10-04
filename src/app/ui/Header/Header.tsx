"use client"

import { usePathname } from "next/navigation";
import classes from "./Header.module.scss";
import Priority from "../Priority/Priority";

export default function Header() {
    const currentPath = usePathname()

    return (
        <div className={classes.header}>
            <h1 className={classes.title}>
                {
                    currentPath === '/' ?
                        'All Tasks' :
                        currentPath === '/completed' ?
                            'Completed Tasks' :
                            currentPath === '/pending' ?
                                'Pending Tasks' :
                                'Overdue Tasks'
                }
            </h1>

            <Priority />
        </div>
    )
}