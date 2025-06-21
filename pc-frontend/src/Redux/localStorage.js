import CryptoJS from 'crypto-js';
//process.env.REACT_APP_HASH_KEY ||
const SECRET_KEY =  'default';

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    const encryptedState = CryptoJS.AES.encrypt(serializedState, SECRET_KEY).toString();
    localStorage.setItem('reduxState', encryptedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

export const loadState = () => {
  try {
    const encryptedState = localStorage.getItem('reduxState');
    if (encryptedState === null) {
      return undefined;
    }
    const bytes = CryptoJS.AES.decrypt(encryptedState, SECRET_KEY);
    const serializedState = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};
