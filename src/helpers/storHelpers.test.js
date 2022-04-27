import { getImageURL } from './storHelpers';

describe('Parameter testing', () => {
    test('1 arg => ERROR', () => {
        expect(() => {getImageURL('maps')}).toThrow();
    });
    test('2 args => SUCCESS', () => {
        expect(() => {getImageURL('maps', '1.jpg')}).not.toThrow();
    });
})

describe('Implementation testing', () => {
    it.todo('Retrieves the correct URL for items from the "characters" folder');
    it.todo('Retrieves the correct URL for items from the "icons" folder');
    it.todo('Retrieves the correct URL for items from the "images" folder');
    it.todo('Retrieves the correct URL for items from the "maps" folder');
});
