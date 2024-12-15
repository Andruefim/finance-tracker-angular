export class User {
  id: number;
  totalBalance: number;
  constructor(user: User) {
    this.id = user.id;
    this.totalBalance = user.totalBalance
  }
}
