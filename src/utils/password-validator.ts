import { IPasswordValidator } from "../presentation/protocols/password-validator";


export class PasswordValidatorAdapter implements IPasswordValidator{
    match(password: string, confirmationPassword: string): boolean {
        if(password === confirmationPassword){
            return true;
        }
        return false;
    }
}