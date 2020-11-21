import Transaction, { TransactionType } from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let sumIncome = 0;
    let sumOutcome = 0;
    if (this.transactions.length > 0) {
      sumIncome = this.transactions
        .filter(transaction => transaction.type === TransactionType.INCOME)
        .map(transaction => transaction.value)
        .reduce((previous, current) => previous + current, 0);

      sumOutcome = this.transactions
        .filter(transaction => transaction.type === TransactionType.OUTCOME)
        .map(transaction => transaction.value)
        .reduce((previous, current) => previous + current, 0);
    }

    const balance: Balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type: type === TransactionType.INCOME ? 'income' : 'outcome',
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
