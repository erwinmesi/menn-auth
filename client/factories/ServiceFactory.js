import user from '~/services/User';
import note from '~/services/Note';

const services = {
  user,
  note
};

const create = key => services[key];

export default { create };
