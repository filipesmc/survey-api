export interface IPasswordValidator{
    match(password: string, confirmationPassword: string): boolean
}