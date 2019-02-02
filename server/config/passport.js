const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDB = {
  id: 1,
  email: 'test@mail.ru',
  password: '123',
};

passport.serializeUser((user, done) => {
  console.log('Serialize', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  //   User.findById(id, (err, user) => {
  //     done(err, user);
  //   });
  console.log('desirialze', id);
  const user = userDB.id === id ? userDB : false;
  done(null, user);
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    // User.findOne({ name: username }, function(err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (user.password !== password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  })
);
