export class MissingParamError extends Error{
    constructor(parameterName: string){
        super(`Missing parameter: ${parameterName}`)
        this.name = 'MissingParamError'
    }
}