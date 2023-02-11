import { EmailValidatorAdapter } from "./email-validator";

describe('EmailValidator Adapter', () => {
    test('Should return false if validator return false', () => {
        const systemUnderTest = new EmailValidatorAdapter();
        const isValid = systemUnderTest.isValid('invalid-email@gmail.com');
        expect(isValid).toBe(false)
    })
})