
// Mock server for authentication
const users = [
  { id: 1, email: 'user@example.com', password: 'password' },
];

export function login(email, password) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      resolve(user);
    } else {
      reject('Invalid credentials');
    }
  });
}
