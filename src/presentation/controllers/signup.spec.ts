import { SignUpController } from "./signup"
import { MissingParamError } from "../errors/missing-param-error"

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        
        const sut = new SignUpController()
        
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
        
        const sut = new SignUpController()
        
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

