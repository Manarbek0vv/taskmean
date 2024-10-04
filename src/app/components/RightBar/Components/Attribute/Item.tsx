import { IAttribute } from "@/lib/attribute.data";
import classes from "./Attribute.module.scss";
import Count from "./Count";
import { Suspense } from "react";

export default function Item({
    attribute
}: {
    attribute: IAttribute
}) {

    return (
        <div className={classes.attribute}>
            <span className={classes.title}>{attribute.title}</span>

            <div className={classes.footer}>
                <div className={classes.line} style={{ backgroundColor: attribute.color || 'black' }} />
                <Suspense fallback={<span className={classes.count}>0</span>}>
                    <Count fetcher={attribute.fetcher} />
                </Suspense>
            </div>
        </div>
    )
}