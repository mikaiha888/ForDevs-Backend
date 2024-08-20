import { Review } from 'src/modules/review/entities/review.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { faker } from '@faker-js/faker';
import datasource from '../data-source';

const reviewFactory = async () => {
  const userRepository = datasource.getRepository(User);

  const users = await userRepository.find();

  if (users.length < 2) {
    throw new Error('Se necesitan al menos dos usuarios para crear reseñas');
  }

  const reviewer = users[Math.floor(Math.random() * users.length)];
  let reviewedUser = users[Math.floor(Math.random() * users.length)];

  while (reviewer.id === reviewedUser.id) {
    reviewedUser = users[Math.floor(Math.random() * users.length)];
  }

  const review = new Review();
  review.rating = faker.number.int({ min: 1, max: 5 });
  review.comment = faker.lorem.sentence();
  review.reviewer = reviewer;
  review.reviewedUser = reviewedUser;

  return review;
};

export default reviewFactory;
