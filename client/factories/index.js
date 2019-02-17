import constant from '~/factories/ConstantsFactory';
import helper from '~/factories/HelperFactory';
import service from '~/factories/ServiceFactory';

const factories = {
  constant,
  helper,
  service
};

export default (type, key) => factories[type].create(key);
