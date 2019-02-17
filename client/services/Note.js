import API from '~/services';
import apiHelper from '~/helpers/API';

const NOTE_URL = '/notes';

export default {
  ...apiHelper(NOTE_URL),
  get: userId => API.get(`${NOTE_URL}?userId=${userId}`)
};
