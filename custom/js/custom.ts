// custom.ts
// sample file for placeholder use only

interface User {
  id: number;
  name: string;
  email?: string; // optional
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}

// Example usage
const user: User = {
  id: 1,
  name: 'Sir Rupertstein the Third',
};

console.log(greetUser(user));
