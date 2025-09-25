import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from 'src/dtos/createAccountDto';
import { Account } from 'src/domain/models';
import { newId } from 'src/domain/logic';
import { StoreService } from 'src/store/store.service';
import { validateAccountDirection } from 'src/domain/logic';

@Injectable()
export class AccountsService {
  constructor(private readonly storeService: StoreService) {}

  findAll() {
    return this.storeService.getAccounts();
  }

  findOne(id: string) {
    return this.storeService.getAccount(id);
  }

  create(accountDTO: CreateAccountDto): Account {
    validateAccountDirection(accountDTO.direction);
    const account = {
      id: newId(accountDTO.id),
      name: accountDTO.name,
      direction: accountDTO.direction,
      balance: accountDTO.balance || 0,
    };

    return this.storeService.saveAccount(account);
  }
}
