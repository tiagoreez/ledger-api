import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from '../../dtos/createTransaction';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() transactionDto: CreateTransactionDto) {
    return this.transactionsService.create(transactionDto);
  }

  @Get()
  getTransactions() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  getTransaction(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }
}
