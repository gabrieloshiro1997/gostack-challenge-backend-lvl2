import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { TransactionType } from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== TransactionType.INCOME && type !== TransactionType.OUTCOME) {
      throw Error('Type not type not allowed');
    }

    const balance = this.transactionsRepository.getBalance();

    if (value > balance.total && type === TransactionType.OUTCOME) {
      throw Error('Insufficient funds');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
