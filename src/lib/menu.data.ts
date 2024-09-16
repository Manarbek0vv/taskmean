import { ClipboardCheck, Github, LayoutGrid, LucideIcon, Timer, TimerOff } from "lucide-react";

export interface IMenu {
    icon: LucideIcon;
    title: string;
    link: string;
}

export const MENU: IMenu[] = [
    {
        icon: LayoutGrid,
        title: 'All',
        link: '/'
    },
    {
        icon: ClipboardCheck,
        title: 'Completed',
        link: '/completed'
    },
    {
        icon: Timer,
        title: 'Pending',
        link: '/pending'
    },
    {
        icon: TimerOff,
        title: 'Overdue',
        link: '/overdue'
    }
]

// ------------------------------------

