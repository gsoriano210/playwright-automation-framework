const testData = {
    validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },

    lockedOutUser: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },

    invalidUser: {
        username: 'wrong_user',
        password: 'wrong_password'
    },

    checkoutInfo: {
        firstName: 'Gabriela',
        lastName: 'Gonzalez',
        postalCode: '33025'
    },

    errorMessages: {
        invalidCredentials: 'Username and password do not match',
        lockedOutUser: 'Sorry, this user has been locked out.',
        usernameRequired: 'Username is required',
        passwordRequired: 'Password is required',
        firstNameRequired: 'First Name is required',
        lastNameRequired: 'Last Name is required',
        postalCodeRequired: 'Postal Code is required'
    },

    urls: {
        baseUrl: 'https://www.saucedemo.com/',
        inventory: '/inventory',
        cart: '/cart'
    }
};

module.exports = { testData };