import {create} from 'zustand'

const useBalanceStore = create((set) => ({
  operations: [],
  setOperations: (operations) => set( {operations} ),
  totalBalance: 0,
  setTotalBalance: (total) => set({ totalBalance: total}),
  incomes: 0,
  setIncomes: (income) => set({ incomes: income}),
  expenses: 0,
  setExpenses: (expense) => set({expenses: expense}) 
}))

export default useBalanceStore