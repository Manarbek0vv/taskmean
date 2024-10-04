"use client"

import { MENU } from "@/lib/menu.data"
import Logo from "../Logo"
import classes from "./Sidebar.module.scss"
import Link from "next/link"
import { RiFileCloseLine } from "react-icons/ri"
import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export default function Sidebar() {
    const session = useSession()
    const pathname = usePathname()

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
                            <li className={clsx(classes.li, { [classes['active-link']]: item.link === pathname })}>
                                {<item.icon className={classes.icon} />}
                            </li>
                            <span className={classes.tooltip}>{item.title}</span>
                        </Link>
                    )))}
                </ul>

                {session.status === 'authenticated' &&
                    <div onClick={() => signOut()} className={classes.exit}>
                        <RiFileCloseLine className={classes.file} />
                    </div>}
            </div>
        </div>
    )
}