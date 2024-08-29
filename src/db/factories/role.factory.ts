import { Role } from 'src/modules/auxiliary/role/entities/role.entity';

const roleFactory = () => {
  const role = new Role();

  return role;
};

export default roleFactory;
