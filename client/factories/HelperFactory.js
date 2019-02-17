import * as joi from '~/helpers/Joi';

const helpers = {
  joi
};

const create = key => helpers[key];

export default { create };
