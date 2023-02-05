export class ServerError extends Error{
    constructor(){
        super('Internal Server Error - Try Again')
        this.name = 'ServerError'
    }
}