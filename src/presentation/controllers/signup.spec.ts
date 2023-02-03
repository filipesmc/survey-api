import { SignUpController } from "./signup"

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
        expect(httpResponse.body).toEqual(new Error('Missing parameter: name'))
    })
        
})