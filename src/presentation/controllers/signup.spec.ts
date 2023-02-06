import { SignUpController } from "./signup"
import { MissingParamError } from "../errors/missing-param-error"
import { InvalidParamError } from "../errors/invalid-param-error";
import { IEmailValidator } from "../protocols/email-validator";
import { ServerError } from "../errors/server-error";
import { IPasswordValidator } from "../protocols/password-validator";
import { AddAccountModel } from "../../domain/usecase/add-account";
import { IAddAccount } from "../../domain/usecase/add-account";
import { AccountModel } from "../../domain/models/account";

interface SystemUnderTestTypes{
    systemUnderTest: SignUpController
    emailValidatorStub: IEmailValidator
    passwordValidatorStub: IPasswordValidator
    addUserAccountStub: IAddAccount
} 

const addUserAccountFactory = (): IAddAccount => {
    class AddUserAccountStub implements IAddAccount{
        add(account: AddAccountModel): AccountModel { 
            const fakeUserAccount = {
                id: 'id',
                name: 'Filipe',
                email: 'filipe@gmail.com',
                password: 'filipe123'
            }
            return fakeUserAccount
        }
    }
    return new AddUserAccountStub();
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

const systemUnderTestFactory = (): SystemUnderTestTypes => {   
    const addUserAccountStub = addUserAccountFactory(); 
    const passwordValidatorStub = passwordValidatorFactory();
    const emailValidatorStub = emailValidatorFactory();
    const systemUnderTest = new SignUpController(emailValidatorStub, passwordValidatorStub, addUserAccountStub);
    return { systemUnderTest, emailValidatorStub, passwordValidatorStub, addUserAccountStub }
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const { systemUnderTest } = systemUnderTestFactory();
        const httpRequest = {
            body: {
                email: 'filipe@gmail.com',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })      
})

describe('SignUp Controller', () => {
    test('Should return 400 if no email is provided', () => { 
        const { systemUnderTest } = systemUnderTestFactory();
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })      
})

describe('SignUp Controller', () => {
    test('Should return 400 if no password is provided', () => {
        const { systemUnderTest } = systemUnderTestFactory();
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'filipe@gmail.com',
                passwordConfirmation: 'filipe123'
            }
        }
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })   
})

describe('SignUp Controller', () => {
    test('Should return 400 if no password confirmation is provided', () => { 
        const { systemUnderTest } = systemUnderTestFactory();      
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'filipe@gmail.com',
                password: 'filipe123'
            }
        }       
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
    })       
})

describe('SignUp Controller', () => {
    test('Should return 400 if an invalid email is provided', () => {
        const { systemUnderTest, emailValidatorStub } = systemUnderTestFactory();
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'invalid_filipe@gmail.com',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        } 
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })     
})

describe('SignUp Controller', () => {
    test('Should call isValid with proper email', () => {
        const { systemUnderTest, emailValidatorStub } = systemUnderTestFactory();
        const isValidResult = jest.spyOn(emailValidatorStub, 'isValid')
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'some_filipe@gmail.com',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        systemUnderTest.handle(httpRequest)
        expect(isValidResult).toHaveBeenCalledWith('some_filipe@gmail.com')
    })  
})

describe('SignUp Controller', () => {
    test('Should return 500 if email validator explode a big exception in server', () => {
        const { systemUnderTest, emailValidatorStub } = systemUnderTestFactory();
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
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })      
})

describe('SignUp Controller', () => {
    test('Should return 500 if provided passwords dont match and launch an exception', () => {
        const { systemUnderTest, passwordValidatorStub } = systemUnderTestFactory();
        jest.spyOn(passwordValidatorStub, 'match').mockImplementationOnce(() => {
            throw new Error();
        })
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'filipe@gmail.com',
                password: 'filipe555',
                passwordConfirmation: 'filipe123'
            }
        } 
        const httpResponse = systemUnderTest.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })     
})

describe('SignUp Controller', () => {
    test('Should call addUserAccount with correct values', () => {
        const { systemUnderTest, addUserAccountStub } = systemUnderTestFactory();
        const addUserSpy = jest.spyOn(addUserAccountStub, 'add')
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'filipe@gmail.com',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        systemUnderTest.handle(httpRequest)
        expect(addUserSpy).toHaveBeenCalledWith({
            name: 'Filipe Cruz',
            email: 'filipe@gmail.com',
            password: 'filipe123'
        })
    })      
})