import { Injectable } from '@nestjs/common';
import { Account, Transaction } from '../domain/models';

@Injectable()
export class StoreService {
  private accounts = new Map<string, Account>();
  private transactions = new Map<string, Transaction>();

  getAccounts(): Account[] {
    return Array.from(this.accounts.values());
  }

  getAccount(id: string): Account {
    const account = this.accounts.get(id);
    if (!account) {
      throw new Error(`Account ${id} not found`);
    }
    return account;
  }

  saveAccount(account: Account): Account {
    this.accounts.set(account.id, account);
    return account;
  }

  saveTransaction(transaction: Transaction): Transaction {
    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  getTransactions(): Transaction[] {
    return Array.from(this.transactions.values());
  }

  getTransactionById(id: string): Transaction {
    const transaction = this.transactions.get(id);
    if (!transaction) {
      throw new Error(`Account ${id} not found`);
    }
    return transaction;
  }
}
