import classes from "./Template.module.scss";
import RightBar from "./components/RightBar/RightBar";
import Main from "./ui/Main/Main";

export default function Template({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <main className={classes.wrapper}>
            {children}

            <RightBar />
        </main>
    )
}