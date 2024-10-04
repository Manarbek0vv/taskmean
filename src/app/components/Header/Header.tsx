import { HeaderLinks } from "@/lib/menu.data";
import classes from "./Header.module.scss";
import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";
import { fetchActiveTasksCount } from "@/lib/data";

export default async function Header() {
    const session = await getServerSession(authConfig)

    const count = session?.user ?
        await fetchActiveTasksCount(Number(session.user.id)) : 0

    return (
        <header className={classes.header}>
            <div className={classes.title}>
                <h1 className={classes.hfirst}>
                    👋Welcome to TaskMean
                </h1>
                <h2 className={classes.hsecond}>
                    {
                        session?.user ?
                            <>
                                You have <span className={classes.count}>{count}</span> active tasks
                            </> :
                            "Please login or register to view your tasks"
                    }
                </h2>
            </div>

            <ul className={classes.ul}>
                {HeaderLinks.map((link) => (
                    <a target="_blank" href={link.link} key={link.id} className={classes.link}>
                        <li className={classes.li}>
                            {<link.icon className={classes.icon} />}
                        </li>
                    </a>
                ))}
            </ul>
        </header>
    )
}