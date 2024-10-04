import { fetchPendingTasks } from "@/lib/data";
import Main from "../ui/Main/Main";

export default function PendingTasks({
    searchParams: { priority }
}: {
    searchParams: {
        priority?: string
    }
}) {

    return <Main callback={fetchPendingTasks} priority={priority} />
}