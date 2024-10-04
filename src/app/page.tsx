import { fetchAllTasks } from "@/lib/data";
import Main from "./ui/Main/Main";

export default function AllTasksPage({
  searchParams: { priority }
}: {
    searchParams: {
      priority?: string
    }
}) {

  return <Main callback={fetchAllTasks} priority={priority} />
}