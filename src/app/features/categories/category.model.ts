

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

export class Categories {
  _categories
  _strategies = new Map();
  constructor(categories: CategoriesData[]) {
    this._categories = categories;
    this._strategies.set('Expenses', ExpenseCategories);
    this._strategies.set('Income', IncomeCategories);
  }

  toCategoryNames(type: CategoriesData['type']) {
    return this._strategies.get(type).toCategoryNames(this._categories)
  }
}

class ExpenseCategories {
  static type = 'Expenses'

  static toCategoryNames(categories: CategoriesData[]) {
    return categories
      .find(d => d.type === this.type)?.data
      .map(c => c.name)
  }
}

class IncomeCategories {
  static type = 'Income'

  static toCategoryNames(categories: CategoriesData[]) {
    return categories
      .find(d => d.type === this.type)?.data
      .map(c => c.name)
  }
}


