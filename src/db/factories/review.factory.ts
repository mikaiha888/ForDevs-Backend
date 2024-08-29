import { Review } from 'src/modules/review/entities/review.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { faker } from '@faker-js/faker';
import dataSource from '../data-source';

const reviewFactory = async () => {
  const userRepository = dataSource.getRepository(User);
  const reviewRepository = dataSource.getRepository(Review);

  const users = await userRepository.find();

  if (users.length < 2) {
    throw new Error('At least two users are required to create reviews');
  }

  let review: Review;
  let isUnique = false;

  while (!isUnique) {
    const reviewerIndex = Math.floor(Math.random() * users.length);
    const reviewer = users[reviewerIndex];

    const remainingUsers = [...users];
    remainingUsers.splice(reviewerIndex, 1);

    const reviewedUser =
      remainingUsers[Math.floor(Math.random() * remainingUsers.length)];
      
    review = new Review();
    review.rating = faker.number.int({ min: 1, max: 5 });
    review.comment = faker.lorem.sentence();
    review.reviewer = reviewer;
    review.reviewedUser = reviewedUser;
    isUnique = true;
  }

  return review;
};

export default reviewFactory;
