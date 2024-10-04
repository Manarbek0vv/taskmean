"use client"

import Image from "next/image"
import classes from "./Profile.module.scss"
import { useSession } from "next-auth/react"

export default function Profile() {
    const { data: session } = useSession()

    return (
        <div className={classes.container}>
            <Image src="/icon.webp" width={70} height={70} alt="icon" className={classes.icon} />
            <div className={classes.info}>
                <h1 className={classes.hello}>Hello,</h1>
                <h2 className={classes.name}>{session?.user.name ?? 'User'}</h2>
            </div>
        </div> 
    )
}