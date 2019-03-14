const errorLogs = {
  getUsers: (err, stack) => ({
    error: {
      severity: 2,
      library: 'Mongoose',
      section: 'Model:User',
      errorMessage: 'get users error',
      fullErrorMessage: err,
      stack: stack,
    },
  }),
};

module.exports = errorLogs;
