import {AddAccountModel, IAddAccount} from '../../../domain/usecase/add-account';
import {AccountModel} from '../../../domain/models/account';
import { IEncrypter } from '../../protocols/encrypter';

export class AddDbAccount implements IAddAccount{

    constructor(private readonly encrypter: IEncrypter){
        this.encrypter = encrypter;
    }

    async add(account: AddAccountModel): Promise<AccountModel>{
        await this.encrypter.encrypt(account.password);
        return new Promise(resolve => resolve(null));         
    }
}