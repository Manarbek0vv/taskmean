import { MENU } from "@/lib/menu.data"
import Logo from "../Logo"
import classes from "./Sidebar.module.scss"
import Link from "next/link"

export default function Sidebar() {

    return (
        <div className={classes.sidebar}>
            <Logo className={classes.logo} />

            <div className={classes.inner}>
                <ul className={classes.ul}>
                    {MENU.map(((item) => (
                        <Link
                            key={item.link}
                            href={item.link}
                            className={classes.link}>
                            <li className={classes.li}>
                                {<item.icon className={classes.icon} />}
                            </li>
                            <span className={classes.tooltip}>{item.title}</span>
                        </Link>
                    )))}
                </ul>
            </div>
        </div>
    )
}