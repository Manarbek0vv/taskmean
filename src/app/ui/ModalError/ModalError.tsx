"use client"

import { motion } from "framer-motion";
import { createPortal } from "react-dom"
import classes from "./ModalError.module.scss"
import { useEffect, useRef, useState } from "react";
import { CircleX } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";


export default function ModalError({ children, setIsError, selector, success }: {
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    selector: string;
    success?: true
}) {
    const [isFolded, setIsFolded] = useState(false)
    const ref = useRef<Element | null>()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        ref.current = document.querySelector(selector)
        setMounted(true)
    }, [])

    useEffect(() => {
        const fold = setTimeout(() => {
            setIsFolded(true)
        }, 4000)

        const timer = setTimeout(() => {
            setIsError(false)
        }, 4050)

        return () => {
            clearTimeout(fold)
            clearTimeout(timer)
        }
    }, [])

    return mounted && ref.current ? createPortal(
        <motion.div
            className={classes.wrapper}
            initial={{
                top: '0',
                scale: '10%'
            }}
            animate={{
                top: isFolded ? '0' : '20px',
                scale: isFolded ? '10%' : '100%'
            }}
            transition={{
                type: "spring",
                damping: 30,
                stiffness: '250',
                duration: 0.25
            }}
        >
            <div className={classes.container}>
                {
                    !success ?
                        <CircleX className={classes.wrong} /> :
                        <FaCircleCheck className={classes.success} />
                }
                <span className={classes.text}>
                    {children}
                </span>
            </div>
        </motion.div>,
        ref.current
    ) :
        null
}