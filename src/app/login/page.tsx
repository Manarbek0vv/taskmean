import Form from './components/Form/Form';
import classes from './page.module.scss';

export default function Page() {

    return (
        <main className={classes.main}>
            <Form />
        </main>
    )
}