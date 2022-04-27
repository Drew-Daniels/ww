import { getImageURL } from './storHelpers';

describe('Parameter testing', () => {
    test('1 arg => ERROR', () => {
        return expect(getImageURL('maps')).rejects.toEqual(Error('All arguments required'));
    });
    test('2 args => SUCCESS', () => {
        return expect(getImageURL('maps', '1.jpg')).resolves.toContain('/v0/b/drew-daniels-wheres-waldo.appspot.com/o/maps%2F1.jpg');
    });
})

describe('Implementation testing', () => {
    describe('FOLDER icons', () => {
        it.todo('Retrieves the correct URL for items from the "icons" folder');    
    })
    describe('FOLDER characters', () => {
        it.todo('Retrieves the correct URL for items from the "characters" folder');
    });
    describe('FOLDER images', () => {
        it.todo('Retrieves the correct URL for items from the "images" folder');
    });
    describe('FOLDER maps', () => {
        test('maps/1.jpg => SUCCESS', () => {
            return expect(getImageURL('maps', '1.jpg')).resolves.toContain('/v0/b/drew-daniels-wheres-waldo.appspot.com/o/maps%2F1.jpg');
        });
        test('maps/2.jpg => SUCCESS', () => {
            return expect(getImageURL('maps', '2.jpg')).resolves.toContain('/v0/b/drew-daniels-wheres-waldo.appspot.com/o/maps%2F2.jpg');
        });
    });
});
