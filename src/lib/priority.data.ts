export enum PriorityEnum {
    ALL = 'All',
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High'
}

export const Priorities: PriorityEnum[] = [
    PriorityEnum.ALL,
    PriorityEnum.LOW,
    PriorityEnum.MEDIUM,
    PriorityEnum.HIGH,
]

export const PrioritiesOrder = {
    [PriorityEnum.ALL]: 0,
    [PriorityEnum.LOW]: 1,
    [PriorityEnum.MEDIUM]: 2,
    [PriorityEnum.HIGH]: 3,
}