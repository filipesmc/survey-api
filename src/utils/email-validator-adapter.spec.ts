import { EmailValidatorAdapter } from "./email-validator";
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail (): boolean {

        return true;
    }
}))

describe('EmailValidator Adapter', () => {
    test('Should return false if validator return false', () => {
        const systemUnderTest = new EmailValidatorAdapter();
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
        const isValid = systemUnderTest.isValid('invalid-email@gmail.com');
        expect(isValid).toBe(false)
    })
})

describe('EmailValidator Adapter', () => {
    test('Should return true if validator return true', () => {
        const systemUnderTest = new EmailValidatorAdapter();
        const isValid = systemUnderTest.isValid('valid-email@gmail.com');
        expect(isValid).toBe(true)
    })
})

describe('EmailValidator Adapter', () => {
    test('Should call validator with correct email', () => {
        const systemUnderTest = new EmailValidatorAdapter();
        const isEmailSpy = jest.spyOn(validator, 'isEmail');
        systemUnderTest.isValid('anyemail@gmail.com');
        expect(isEmailSpy).toHaveBeenCalledWith('anyemail@gmail.com')
    })
})
