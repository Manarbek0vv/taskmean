import { fetchCompletedTasks } from "@/lib/data";
import Main from "../ui/Main/Main";

export default function CompletedTasks({
  searchParams: { priority }
}: {
  searchParams: {
    priority?: string
  }
}) {

  return <Main callback={fetchCompletedTasks} priority={priority} />
}