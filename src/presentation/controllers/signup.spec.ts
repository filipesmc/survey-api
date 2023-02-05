import { SignUpController } from "./signup"
import { MissingParamError } from "../errors/missing-param-error"
import { InvalidParamError } from "../errors/invalid-param-error";
import { IEmailValidator } from "../protocols/email-validator";

interface SutTypes{
    sut: SignUpController
    emailValidatorStub: IEmailValidator
} 

const systemUnderTestFactory = (): SutTypes => {
   
    class EmailValidatorStub implements IEmailValidator{
        isValid (email: string): boolean {
            return true;
        }
    }
    
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);

    return {
        sut,
        emailValidatorStub
    }

}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        
        const { sut } = systemUnderTestFactory();
        
        const httpRequest = {
            body: {
                email: 'filipe@gmail.com',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })
        
})

describe('SignUp Controller', () => {
    test('Should return 400 if no email is provided', () => {
        
        const { sut } = systemUnderTestFactory();

        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
        
})

describe('SignUp Controller', () => {
    test('Should return 400 if no password is provided', () => {
        
        const { sut } = systemUnderTestFactory();

        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'filipe@gmail.com',
                passwordConfirmation: 'filipe123'
            }
        }
        
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })
        
})

describe('SignUp Controller', () => {
    test('Should return 400 if no password confirmation is provided', () => {
        
        const { sut } = systemUnderTestFactory();
        
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'filipe@gmail.com',
                password: 'filipe123'
            }
        }
        
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
    })
        
})

describe('SignUp Controller', () => {
    test('Should return 400 if an invalid email is provided', () => {
        
        const { sut, emailValidatorStub } = systemUnderTestFactory();
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'invalid_filipe@gmail.com',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })
        
})