const errorLogs = {
    signup: error => {
    const {err, errorMessage, userError, stack} = error;
    return {
      error: {
        severity: 1,
        library: 'Mongoose',
        section: 'Model:User',
        errorMessage: errorMessage,
        fullErrorMessage: err,
        stack: stack,
        info: {
          user: userError,
        },
      },
    };
  },

  loginNotMatch: error => {
    const { err, stack, formData } = error;
    return {
      error: {
        severity: 1,
        library: 'Mongoose',
        section: 'Model:User',
        errorMessage: 'Wrong password',
        fullErrorMessage: err,
        stack: stack,
        info: {
          user: {
            email: formData.email,
          },
        },
      },
    };
  },

  loginNoUser: error => {
    const { severity, errorMessage, err, stack, formData} = error;
    return {
      error: {
        severity: severity,
        library: 'Mongoose',
        section: 'Model:User',
        errorMessage: errorMessage,
        fullErrorMessage: err,
        stack: stack,
        info: {
          user: {
            email: formData.email,
          },
        },
      },
    };
  },

  disconnect: (err, stack) => ({
    error: {
      severity: 1,
      library: 'Mongoose',
      section: 'Model:User',
      errorMessage: 'disconnect error',
      fullErrorMessage: err,
      stack: stack,
    },
  }),
}

module.exports = errorLogs;
