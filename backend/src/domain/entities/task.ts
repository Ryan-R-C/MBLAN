import { Entity } from "../../core/Entity";

export type TaskProps = {
    id?: string
    title: string
    description: string
    completed: boolean
}

export class Task extends Entity<TaskProps> {
    private constructor(props: TaskProps, id?: string, createdAt?: Date) {
        super(props, id, createdAt)
        this.validate()
    }

    public static create(props: TaskProps, id?: string, createdAt?: Date){
        return new Task({
            ...props,
        }, id, createdAt)
    }

    
    private validate(){
        if(!this.props.title) throw new Error('Title should be defined')
        if(!this.props.description) throw new Error('Description should be defined')
        if(this.props.completed !== false && this.props.completed !== true) throw new Error('Completed should be defined')
    }

    public get title(){
        return this.props.title
    }

    public get description(){
        return this.props.description
    }

    public get completed(){
        return this.props.completed
    }

}