import { Project } from "src/project/entities/project.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string

    @ManyToMany(() => Project, (project) => project.tags)
    @JoinTable()
    projects: Project[]
}