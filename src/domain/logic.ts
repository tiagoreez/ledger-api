import { v4 as uuidv4 } from 'uuid';

import { Account, Entry } from './models.js';
import { Direction } from './direction.js';

export function newId(provided?: string): string {
  return provided ?? uuidv4();
}

export function applyEntryToAccount(account: Account, entry: Entry): Account {
  if (!Number.isFinite(entry.amount) || entry.amount <= 0) {
    throw new Error('Entry amount must be a positive finite number');
  }
  const same = account.direction === entry.direction;
  const difference = same ? entry.amount : -entry.amount;
  return { ...account, balance: account.balance + difference };
}

export function validateAndBalance(entries: Omit<Entry, 'id'>[]): void {
  if (entries.length < 1)
    throw new Error('Transaction must have at least two entries');

  let debit = 0,
    credit = 0;
  for (const e of entries) {
    if (!Number.isFinite(e.amount) || e.amount <= 0) {
      throw new Error('Entry amount must be a positive finite number');
    }
    if (e.direction === 'debit') debit += e.amount;
    else if (e.direction === 'credit') credit += e.amount;
    else throw new Error('Entry direction must be debit or credit');
  }
  if (debit !== credit)
    throw new Error(
      `Entries do not balance: debits=${debit} credits=${credit}`,
    );
}

export function finalizeEntries(entries: Omit<Entry, 'id'>[]): Entry[] {
  return entries.map((e) => ({ ...e, id: uuidv4() }));
}

export function validateAccountDirection(direction: Direction): void {
  if (!direction) throw new Error('Account direction is required');
  if (!['credit', 'debit'].includes(direction))
    throw new Error('Entry direction must be debit or credit');
}
