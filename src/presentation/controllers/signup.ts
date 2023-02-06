import { IHttpRequest, IHttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/missing-param-error"
import { badRequest, serverError } from "../helpers/http-helper"
import { IController } from "../protocols/controller"
import { IEmailValidator } from "../protocols/email-validator"
import { InvalidParamError } from "../errors/invalid-param-error"
import { IPasswordValidator } from "../protocols/password-validator"
import { IAddAccount } from "../../domain/usecase/add-account"

export class SignUpController implements IController{
    constructor(private readonly emailValidator: IEmailValidator, private readonly passValidator: IPasswordValidator,
        private readonly addUserAccount: IAddAccount){ }

    handle (httpRequest: IHttpRequest): IHttpResponse { 
        try{ 
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for(const field of requiredFields){
                if (!httpRequest.body[field]){ return badRequest(new MissingParamError(field)) }
            }
            const { name, email, password, confirmationPassword } = httpRequest.body
            const passwordsMatch = this.passValidator.match(password, confirmationPassword)
            if(!passwordsMatch) return badRequest(new InvalidParamError('passwordConfirmation'))
            const isValidEmail = this.emailValidator.isValid(email)
            if(!isValidEmail) return badRequest(new InvalidParamError('email'))
            this.addUserAccount.add({ name, email, password })
        } catch(error){ 
            return serverError();
        }
    }
}