import { Role } from 'src/modules/role/entities/role.entity';

const roleFactory = () => {
  const role = new Role();

  return role;
};

export default roleFactory;
