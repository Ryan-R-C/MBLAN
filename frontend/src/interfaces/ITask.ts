
export interface ITask {
    id: string
    title: string
    description: string
    completed: boolean
    createdAt: Date
}

export interface ITaskProps {
    id?: string
    title: string
    description: string
    completed?: boolean
}
