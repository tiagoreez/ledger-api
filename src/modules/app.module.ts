import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [AccountsModule, TransactionsModule, StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
