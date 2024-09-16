import classes from "./Header.module.scss";

export default function Header() {

    return (
        <header className={classes.header}>
            <div className={classes.title}>
                <h1 className={classes.hfirst}>
                    Welcome to TaskMean
                </h1>
                <h2 className={classes.hsecond}>
                    Please login or register to view your tasks
                </h2>
            </div>

            <ul className={classes.ul}>
                
            </ul>
        </header>
    )
}