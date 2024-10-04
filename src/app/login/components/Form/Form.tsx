"use client"

import Link from "next/link"
import classes from "./Form.module.scss"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { loginUserAction, LogState } from "@/lib/actions"
import { useFormState } from "react-dom"
import { redirect } from "next/navigation"
import ModalError from "@/app/ui/ModalError/ModalError"
import FormButton from "../FormButton/FormButton"

const initialState: LogState = {
    success: null,
}

export default function Form() {
    const [isVisible, setIsVisible] = useState(false)
    const [state, action] = useFormState(loginUserAction, initialState)
    const [isError, setIsError] = useState(false)
    const session = useSession()

    useEffect(() => {
        if (state.success === false) {
            setIsError(true)
        }
    }, [state])

    useEffect(() => {
        if (state.success && state.response) {
            signIn('credentials', state.response)
        }
    }, [state])

    useEffect(() => {
        if (session.status === 'authenticated') {
            redirect('/')
        }
    }, [session])
    return (
        <>
            {isError && <ModalError
                selector="#modal"
                setIsError={setIsError}
            >
                {
                    !state.error ?
                        state.message :
                        state.error[1][0]
                }
            </ModalError>}

            <form
                action={action}
                className={classes.form}>
                <div className={classes.main}>
                    <h1 className={classes.title}>Login to Your Account</h1>
                    <p className={classes.p}>
                        Login Now. Don't have an account?
                        <span> </span>
                        <Link href={'/register'} className={classes.link}>
                            Register here
                        </Link>
                    </p>
                </div>

                <div className={classes.inner}>
                    <label htmlFor="email" className={classes.label}>
                        Email
                        <input id="email" name="email" type="text" className={classes.input} placeholder="johndoe@gmail.com" required />
                    </label>

                    <label htmlFor="password" className={classes.label}>
                        Password
                        <input id="password" name="password" type={isVisible ? 'text' : 'password'} className={classes.input} required placeholder="***************" />
                        {
                            isVisible ?
                                <EyeOff className={classes.eye}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsVisible(!isVisible)
                                    }} /> :
                                <Eye className={classes.eye}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setIsVisible(!isVisible)
                                    }} />
                        }
                    </label>

                    <p className={classes.forgot}>Forgot password?</p>

                    <FormButton />
                </div>
            </form>
        </>
    )
}