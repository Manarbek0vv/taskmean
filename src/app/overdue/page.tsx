import { fetchOverdueTasks } from "@/lib/data";
import Main from "../ui/Main/Main";

export default function OverdueTasks({
    searchParams: { priority }
}: {
    searchParams: {
        priority?: string
    }
}) {

    return <Main callback={fetchOverdueTasks} priority={priority} />
}