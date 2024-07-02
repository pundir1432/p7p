const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth2').Strategy; 
const googleAuthModel = require("../model/googleAuth.model")

passport.serializeUser((user , done) => { 
	done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
	done(null, user); 
}); 

passport.use(new GoogleStrategy({ 
	clientID:process.env.CLIENTID, // Your Credentials here. 
	clientSecret:process.env.CLIENT_SECRET,
	callbackURL:"http://localhost:8090/auth/google/callback", 
	passReqToCallback:true
}, 
async function(request, accessToken, refreshToken, profile, done){ 
	console.log("profile: " + profile);
	try {
		let userdetail = await googleAuthModel.findOne({googleId:profile.id})
		if(!userdetail) {
			userdetail = new googleAuthModel({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value
            })
            await userdetail.save()
		}

        return done(null, userdetail); 
		
	} catch (error) {
		return done(null, profile); 
	}
} 
));