import { getServerSession } from "next-auth"
import classes from "./Attribute.module.scss"
import { authConfig } from "@/config/auth"

export default async function Count({
    fetcher
}: {
    fetcher: (authorId: number) => Promise<number>
}) {
    const session = await getServerSession(authConfig)

    if (!session) {
        return <span className={classes.count}>0</span>
    }

    const count = await fetcher(Number(session.user.id))

    return (
        <span className={classes.count}>{count}</span>
    )
}