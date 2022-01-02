let val = {
  "-MrvKBqw_tjk0DFQkiTl": {
    emp_email: "asd@mail.com",
    emp_id: 7106481407803834,
    emp_pass: "testing123",
  },
  "-MrvKV1CUA-OfZcOpuSt": {
    emp_email: "newasd@mail.com",
    emp_id: 8567263303653561,
    emp_pass: "testing123",
  },
};

for (a in val) {
  key = {
    key: a,
  };
  var data = {
    ...key,

    ...val[a],
  };

  console.log(data);
}
