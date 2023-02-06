import { ServerError } from "../errors/server-error"
import { IHttpResponse } from "../protocols/http"

enum EResponsesCode{
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
    SUCCESS = 200
}

export const badRequest = (error: Error): IHttpResponse => {
    return { statusCode: EResponsesCode.BAD_REQUEST, body: error }
}

export const serverError = (): IHttpResponse => {
    return { statusCode: EResponsesCode.SERVER_ERROR, body: new ServerError() }
}

export const success = (data: any): IHttpResponse => {
    return { statusCode: EResponsesCode.SUCCESS, body: data }
}