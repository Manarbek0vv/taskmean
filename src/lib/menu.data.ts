import { ClipboardCheck, Github, LayoutGrid, LucideIcon, Moon, Timer, TimerOff, User } from "lucide-react";

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

type IHeaderLink = Omit<IMenu, 'title'> & { id: number }

const GITHUB = "https://github.com/Manarbek0vv/taskmean"

export const HeaderLinks: IHeaderLink[] = [
    {
        id: 1,
        icon: Github,
        link: GITHUB,
    },
    {
        id: 2,
        icon: Moon,
        link: GITHUB,
    },
    {
        id: 3,
        icon: User,
        link: GITHUB,
    }
]