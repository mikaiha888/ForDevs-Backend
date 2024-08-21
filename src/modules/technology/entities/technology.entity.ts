import { Project } from "src/modules/project/entities/project.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Technology {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string

    @ManyToMany(() => Project, (project) => project.technologies)
    projects: Project[]
}