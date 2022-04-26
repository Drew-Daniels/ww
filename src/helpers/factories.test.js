import { UserFactory, GameFactory } from './factories';

describe('UserFactory tests', () => {
    describe('UserFactory id tests', () => {
        it('Accepts an integer greater than 0 for id', () => {
            // TODO: Find a way to just test for id property, value instead of including the name property, value as a caveat
            expect(UserFactory(1)).toEqual({ id: 1, name: '' });
        });
        it('Does NOT accept a decimal for id', () => {
            expect(() => UserFactory(1.1)).toThrow();
        });
        it('Does NOT accept a 0 for id', () => {
            expect(() => UserFactory(0)).toThrow();
        });
        it('Does NOT accept a negative integer for id', () => {
            expect(() => UserFactory(-1)).toThrow();
        });
        it('Does NOT accept no value being passed for id', () => {
            expect(() => UserFactory()).toThrow();
        });

    });
    // describe('UserFactory name tests', () => {

    // });
});


// describe('GameFactory tests', () => {
//     it('Accepts an integer as "user_id')
//     it('Accepts string as "user_id"')
// })
