import local from 'passport-local'
import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import { userManager } from '../controllers/user.controller.js'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import { authToken, generateToken } from '../utils/jwt.js'
import { cartManager } from '../controllers/cart.controller.js'

const LocalStrategy = local.Strategy 
const JWTStrategy = jwt.Strategy 
const ExtractJWT = jwt.ExtractJwt 

const initializePassport = () => {

    const cookieExtractor = (req) => {
        const token = req.cookies ? req.cookies.jwtCookies : null
        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //De donde extraigo mi token
        secretOrKey: process.env.COOKIE_SECRET //Mismo valor que la firma de las cookies
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }

    }))

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        
            const { first_name, last_name, email, age } = req.body
            try {
                const user = await userManager.getElementByEmail(username) 

                if (user) { 
                    return done(null, false) 

                }

                const passwordHash = createHash(password)

                const carrito = await cartManager.addElements()
                const userCreated = await userManager.addElements([{
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: passwordHash,
                    idCart: carrito[0]._id
                }])

                const token = generateToken(userCreated)
                console.log(token)
                return done(null, userCreated)

            } catch (error) {
                return done(error)
            }

        }

    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await userManager.getElementByEmail(username)

            if (!user) { 
                return done(null, false)
            }
            if (validatePassword(password, user.password)) { 
                return done(null, user)
            }

            return done(null, false)

        } catch (error) {
            return done(error)
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/authSession/githubSession'
    }, async (accessToken, refreshToken, profile, done) => {

        try {
            
            const user = await userManager.getElementByEmail(profile._json.email)

            if (user) { 
                done(null, user)
            } else {
                const passwordHash = createHash('coder123')
                const userCreated = await userManager.addElements([{
                    first_name: profile._json.login,
                    last_name: ' ',
                    email: profile._json.email,
                    age: 18,
                    password: passwordHash 
                }])

                done(null, userCreated)
            }

        } catch (error) {
            return done(error)
        }
    }))

    //Iniciar la session del usuario
    passport.serializeUser((user, done) => {
        if (Array.isArray(user)) {
            done(null, user[0]._id) //xq la primera vez lo toma como objeto, luego como array
        }else{
            done(null, user._id)
        }
    })

    //Eliminar la sesion del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await userManager.getElementById(id)
        done(null, user)

    })

}

export default initializePassport