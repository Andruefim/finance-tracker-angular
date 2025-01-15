

export interface Category {
  name: string;
  description: string;
  type: 'Income' | 'Expenses';
  id?: number;
}


export interface CategoriesData {
  type: 'Income' | 'Expenses';
  data: Category[];
}

