import { Controller } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Param, Get, Body, Post } from '@nestjs/common';
import { CreateAccountDto } from 'src/dtos/createAccountDto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAccounts() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  getAccount(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Post()
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }
}
