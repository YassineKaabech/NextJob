import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Job } from "./job.entity"

@Entity()
export class JobImage {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(() => Job, (job) => job.images)
    job: Job
}