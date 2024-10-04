import Tasks from "@/app/components/Tasks/Tasks";
import Header from "../Header/Header";
import classes from "./Main.module.scss";
import { Task } from "@prisma/client";
import { Suspense } from "react";

export default function Main({
    callback,
    priority
}: {
    callback: (authorId: number) => Promise<Task[] | 'Failed to fetch Tasks.'>
    priority?: string
}) {

    return (
        <div className={classes.main}>
            <Header />

            <Suspense fallback={<h1>Loading...</h1>}>
                <Tasks callback={callback} priority={priority} />
            </Suspense>
        </div>
    )
}