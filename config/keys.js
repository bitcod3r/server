// file add in .gitignore
module.exports = {
    google: {
        clientID: '923318839036-mcjk5rvkq3036h2ve82ejbkaa0b59rpu.apps.googleusercontent.com',
        clientSecret: '0PF5sHDrvzI7vNiz-8-pZ8wm',
        callbackURL: '/auth/google/redirect'
    },
    dynamodb: {
        dbURL: 'http://localhost:8000'
    },
    session:{
        cookieKey:'server-test'
    }
}