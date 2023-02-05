import { SignUpController } from "./signup"
import { MissingParamError } from "../errors/missing-param-error"
import { InvalidParamError } from "../errors/invalid-param-error";
import { IEmailValidator } from "../protocols/email-validator";
import { ServerError } from "../errors/server-error";
import { IPasswordValidator } from "../protocols/password-validator";

interface SutTypes{
    sut: SignUpController
    emailValidatorStub: IEmailValidator
    passwordValidatorStub: IPasswordValidator
} 

const passwordValidatorFactory = (): IPasswordValidator =>{
    class PasswordValidatorStub implements IPasswordValidator{
        match(password: string, confirmationPassword: string): boolean { return true; }
    }
    return new PasswordValidatorStub();
}

const emailValidatorFactory = (): IEmailValidator =>{
    class EmailValidatorStub implements IEmailValidator{
        isValid (email: string): boolean { return true; }
    }
    return new EmailValidatorStub();
}

const systemUnderTestFactory = (): SutTypes => {    
    const passwordValidatorStub = passwordValidatorFactory();
    const emailValidatorStub = emailValidatorFactory();
    const sut = new SignUpController(emailValidatorStub, passwordValidatorStub);
    return { sut, emailValidatorStub, passwordValidatorStub }
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

describe('SignUp Controller', () => {
    test('Should call isValid with proper email', () => {
        const { sut, emailValidatorStub } = systemUnderTestFactory();
        const isValidResult = jest.spyOn(emailValidatorStub, 'isValid')
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'some_filipe@gmail.com',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        sut.handle(httpRequest)
        expect(isValidResult).toHaveBeenCalledWith('some_filipe@gmail.com')
    })  
})

describe('SignUp Controller', () => {
    test('Should return 500 if email validator explode a big exception in server', () => {
        const { sut, emailValidatorStub } = systemUnderTestFactory();
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error();
        })
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'some_crazy_email@gmail.com',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })      
})

describe('SignUp Controller', () => {
    test('Should return 400 if provided passwords dont match', () => {
        const { sut, passwordValidatorStub } = systemUnderTestFactory();
        jest.spyOn(passwordValidatorStub, 'match').mockImplementationOnce(() => {
            return false;
        })
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'filipe@gmail.com',
                password: 'filipe555',
                passwordConfirmation: 'filipe123'
            }
        } 
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
    })     
})