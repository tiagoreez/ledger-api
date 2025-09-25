import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/dtos/createTransaction';
import { Transaction } from 'src/domain/models';
import {
  validateAndBalance,
  finalizeEntries,
  applyEntryToAccount,
} from 'src/domain/logic';
import { BadRequestException } from '@nestjs/common';
import { Entry } from 'src/domain/models';
import { newId } from 'src/domain/logic';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly storeService: StoreService) {}

  create(dto: CreateTransactionDto): Transaction {
    console.log(dto);
    try {
      validateAndBalance(dto.entries as any);
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }

    for (const e of dto.entries) {
      if (!this.storeService.getAccount(e.account_id)) {
        throw new BadRequestException(
          `Account does not exist: ${e.account_id}`,
        );
      }
    }

    const finalized: Entry[] = finalizeEntries(dto.entries as any);

    for (const e of finalized) {
      const acc = this.storeService.getAccount(e.account_id);
      const updated = applyEntryToAccount(acc, e);
      this.storeService.saveAccount(updated);
    }

    const tx: Transaction = {
      id: newId(dto.id),
      name: dto.name,
      entries: finalized,
    };
    this.storeService.saveTransaction(tx);
    return tx;
  }

  findAll() {
    return this.storeService.getTransactions();
  }

  findOne(id: string) {
    return this.storeService.getTransactionById(id);
  }
}
