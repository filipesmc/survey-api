import { PasswordValidatorAdapter } from "./password-validator";

describe('PasswordValidator Adapter', () => {
    test('Should return true if validator return true', () => {
        const systemUnderTest = new PasswordValidatorAdapter();
        const isValid = systemUnderTest.match('equal', 'equal');
        expect(isValid).toBe(true)
    })
})

describe('PasswordValidator Adapter', () => {
    test('Should return false if validator return false', () => {
        const systemUnderTest = new PasswordValidatorAdapter();
        const isValid = systemUnderTest.match('equal', 'not-equal');
        expect(isValid).toBe(false)
    })
})

