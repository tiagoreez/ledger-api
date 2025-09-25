import { Direction } from './direction';

export interface Account {
  id: string;
  name?: string;
  direction: Direction;
  balance: number;
}

export interface Entry {
  id: string;
  account_id: string;
  direction: Direction;
  amount: number;
}

export interface Transaction {
  id: string;
  name?: string;
  entries: Entry[];
}
