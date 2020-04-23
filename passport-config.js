const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport) {
    const authenticateUser = async (email, passport, done) => {
        const account = getAccountByEmail(email)
        if (account == null) {
            return done(null, flase, { message: 'no user with that email'})
        }

        try {
            if (await bcrypt.compare(password, account.password)) {
                return done(null, account)
            } else {
                return done(null, false, {message: 'Password Incorrect'})
            }
        } catch (e) {
            return done(e)

        }

    }
    passport.use(new LocalStrategy({ usernameField: 'email'},
    authenticateUser))
    passport.serializeUser((account, done) => {})
    passport.deserializeUser((id, done) => {})
}

module.exports = initialize