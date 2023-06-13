// export interface TransactionRepository {
//   createTransaction(data: CreateTransactionData): Promise<void>;
//   deleteTransaction(data: DeleteTransactionData): Promise<void>;
//   updateTransaction(data: UpdateTransactionData): Promise<void>;
//   findTransactions(): Promise<{ transactions: Transaction[] }>;
//   findTransaction(
//     data: FindTransactionData,
//   ): Promise<{ transactions: Transaction }>;
// }

// export interface CreateTransactionData {
//   user_id: string;
//   wallet_id: string;
//   value: string;
//   description?: string;
//   transaction_date?: string;
// }

// export interface DeleteTransactionData {
//   user_id: string;
//   transaction_id: string;
// }

// export interface UpdateTransactionData {
//   user_id: string;
//   transaction_id: string;
//   data: Partial<Transaction>;
// }

// export interface FindTransactionData {
//   user_id: string;
//   transaction_id: string;
// }

// export interface FindTransactionsData {
//   user_id: string;
//   wallet_id?: string;
// }
