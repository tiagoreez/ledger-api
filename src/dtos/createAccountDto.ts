import {
  IsEnum,
  IsString,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  Min,
  IsNumber,
} from 'class-validator';

export class CreateAccountDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsEnum(['debit', 'credit'])
  direction!: 'debit' | 'credit';

  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number;
}
