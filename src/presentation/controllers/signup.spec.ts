import { SignUpController } from "./signup"

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        
        const sut = new SignUpController()
        
        const httpRequest = {
            body: {
                name: 'Filipe Cruz',
                email: 'filipe@gmail.com',
                password: 'filipe123',
                passwordConfirmation: 'filipe123'
            }
        }
        
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
        
})