import {
    ref,
    getDownloadURL,
} from 'firebase/storage';
import { storage } from '../firebase';

/**
 * 
 * @param {string} folder 
 * @param {string} fname 
 * @returns Promise
 */
 async function getImageURL(folder, fname) {
    if (arguments.length < 2) { throw new Error('All arguments required') };
    const pathRef = ref(storage, [folder, fname].join('/'));
    return getDownloadURL(pathRef);
}

export {
    getImageURL,
}