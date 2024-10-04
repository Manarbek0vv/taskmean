import Attribute from "./Components/Attribute/Attribute"
import Profile from "./Components/Profile/Profile"
import ProgressBar from "./Components/ProgressBar/ProgressBar"
import classes from "./RightBar.module.scss"

export default function RightBar() {

    return (
        <aside className={classes.wrapper}>
            <div className={classes.info}>
                <Profile />
                <Attribute />
                <span className={classes.activity}>Activity</span>
            </div>

            <ProgressBar />
        </aside>
    )
}