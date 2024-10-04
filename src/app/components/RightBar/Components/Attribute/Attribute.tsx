import { Attributes } from "@/lib/attribute.data";
import classes from "./Attribute.module.scss";
import Item from "./Item";

export default function Attribute() {

    return (
        <div className={classes.container}>
            {Attributes.map(attribute =>
                <Item key={attribute.title} attribute={attribute} />
            )}
        </div>
    )
}