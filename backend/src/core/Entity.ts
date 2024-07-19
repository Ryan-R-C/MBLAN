import crypto from 'crypto'

export class Entity<T> {
    protected _id: string
    public createdAt: Date
    public props: T

    public get id(){
        return this._id
    }

    constructor(props: T, id?: string, createdAt?: Date) {
        this._id = id ?? crypto.randomUUID().toString(),
        this.createdAt = createdAt ?? new Date(),
        this.props = props
    }
}