import { fetchActiveTasksCount, fetchCompletedTasksCount, fetchOverdueTasksCount, fetchTotalTasksCount } from "./data";

export interface IAttribute {
    title: string;
    color: string;
    fetcher: (authorId: number) => Promise<number>
}

export const Attributes: IAttribute[] = [
    {
        title: 'Total Tasks:',
        color: 'rgb(168 85 247)',
        fetcher: fetchTotalTasksCount,
    },
    {
        title: 'In Progress:',
        color: 'rgb(58 175 174)',
        fetcher: fetchActiveTasksCount,
    },
    {
        title: 'Overdue Tasks:',
        color: 'rgb(251 146 60)',
        fetcher: fetchOverdueTasksCount,
    },
    {
        title: 'Completed:',
        color: 'rgb(74 222 128',
        fetcher: fetchCompletedTasksCount
    }
]