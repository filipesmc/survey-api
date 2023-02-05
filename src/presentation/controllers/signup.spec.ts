import { SignUpController } from "./signup"
import { MissingParamError } from "../errors/missing-param-error"

const systemUnderTestFactory = (): SignUpController => {
    return new SignUpController();
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        
        const sut = systemUnderTestFactory();
        
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
        
        const sut = systemUnderTestFactory();
        
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
        
        const sut = systemUnderTestFactory();
        
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
        
        const sut = systemUnderTestFactory();
        
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

