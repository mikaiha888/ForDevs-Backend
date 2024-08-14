import { Project } from "src/project/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Technology {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string

    @ManyToMany(() => Project, (project) => project.technologies)
    @JoinColumn({ name: 'projects' })
    projects: Project[]
}