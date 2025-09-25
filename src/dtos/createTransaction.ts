import {
  IsEnum,
  IsString,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class EntryInput {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsEnum(['debit', 'credit'] as const)
  direction!: 'debit' | 'credit';

  @IsUUID()
  account_id!: string;

  @IsPositive()
  amount!: number;
}

export class CreateTransactionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntryInput)
  entries!: EntryInput[];
}
