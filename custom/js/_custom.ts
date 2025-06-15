interface User {
  name: string;
  age: number;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    console.log(`Added user: ${user.name}`);
  }

  getUsers(): User[] {
    return this.users;
  }
}

// Example usage
const manager = new UserManager();
manager.addUser({ name: 'John Doe', age: 30 });
manager.addUser({ name: 'Jane Smith', age: 25 });
manager.addUser({ name: 'Dan Oldbones', age: 2500 });

console.log('Current users:', manager.getUsers());
