export class InvalidParamError extends Error{
    constructor(parameterName: string){
        super(`Invalid parameter: ${parameterName}`)
        this.name = 'InvalidParamError'
    }
}