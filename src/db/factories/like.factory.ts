import { Like } from 'src/modules/like/entities/like.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import dataSource from '../data-source';


const likeFactory= async() => {
  const like = new Like();

  const userRepository = dataSource.getRepository(User);
  const projectRepository = dataSource.getRepository(Project);

  const user = (await userRepository.find())[Math.floor(Math.random() * (await userRepository.count()))];
  const project = (await projectRepository.find())[Math.floor(Math.random() * (await projectRepository.count()))];

  if (!user || !project) {
    throw new Error('User or Project not found during like creation');
  }

  like.user = user;
  like.project = project;

  return like;
};

export default likeFactory;
