import Form from './components/Form/Form';
import classes from './page.module.scss';
import { getServerSession } from "next-auth";

export default function Page() {

    return (
        <main className={classes.main}>
            <Form />
        </main>
    )
}