import {
    getStorage,
    ref,
    getDownloadURL,
} from 'firebase/storage';

import { getApp } from 'firebase/app';

/**
 * 
 * @param {string} folder 
 * @param {string} fname 
 * @returns Promise
 */
 async function getImageURL(folder, fname) {
    const storage = getStorage(getApp());
    const pathRef = ref(storage, [folder, fname].join('/'));
    return getDownloadURL(pathRef);
}

export {
    getImageURL,
}