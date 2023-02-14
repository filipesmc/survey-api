import { IEncrypter } from "../../protocols/encrypter";
import { AddDbAccount } from "./add-db-account";

describe('AddDbAccount Usecase', () => {
    test('Should call Encrypter class with correct password', async () => {
        class EncrypterStub implements IEncrypter{
            async encrypt(password: string): Promise<string>{
                return new Promise(resolve => resolve('password_hash'));
            }
        }
        const encrypterStub = new EncrypterStub();
        const systemUnderTest = new AddDbAccount(encrypterStub);
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
        const account = {   
            name: 'name',
            email: 'email',
            password: 'password'
        }
        await systemUnderTest.add(account);
        expect(encryptSpy).toHaveBeenCalledWith(account.password);
    })
})