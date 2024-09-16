import { HeaderLinks } from "@/lib/menu.data";
import classes from "./Header.module.scss";
import Link from "next/link";

export default function Header() {

    return (
        <header className={classes.header}>
            <div className={classes.title}>
                <h1 className={classes.hfirst}>
                    👋Welcome to TaskMean
                </h1>
                <h2 className={classes.hsecond}>
                    Please login or register to view your tasks
                </h2>
            </div>

            <ul className={classes.ul}>
                {HeaderLinks.map((link) => (
                    <Link href={link.link} key={link.id} className={classes.link}>
                        <li className={classes.li}>
                            {<link.icon className={classes.icon} />}
                        </li>
                    </Link>
                ))}
            </ul>
        </header>
    )
}