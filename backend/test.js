const { email, password, permission } = {
  email: "Admin",
  password: "123123",
  permission: "100",
};
console.log(email);
const test = {
  Admin: {
    res: 1,
  },
};
console.log(test[email].res);
