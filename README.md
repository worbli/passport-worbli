# passport-worbli

## Install

    $ npm install passport-facebook

## Usage

#### Configure Strategy

The Worbli authentication strategy authenticates users using a Worbli
account and OAuth 2.0 tokens. The app ID and secret obtained when creating an
application are supplied as options when creating the strategy. The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Worbli profile. The `verify` callback must call `cb` providing a user to
complete authentication.

```js
passport.use(new WorbliStrategy({
        clientID: WORBLI_APP_ID,
        clientSecret: WORBLI_APP_SECRET,
        callbackURL: "http://localhost:3000/worbli/callback-oauth2",
        scope: "user.email user.fname user.lname"
    },
    function(accessToken, refreshToken, profile, cb) {
    }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'worbli'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/worbli',
    passport.authenticate('worbli'));

app.get('/auth/worbli/callback',
    passport.authenticate('worbli', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
```
