const OAuth2Strategy = require('passport-oauth2')
const util = require('util')
const Profile = require('./profile')
const InternalOAuthError = require('passport-oauth2').InternalOAuthError
//   , APIError = require('./errors/apierror');

/**
 * `Strategy` constructor.
 *
 * Options:
 *   - `clientID`      your Worbli application's Client ID.
 *   - `clientSecret`  your Worbli application's Client Secret.
 *   - `callbackURL`   URL to which Worbli will redirect the user after granting authorization.
 *   - `scope`         permission scopes to request.
 *
 * Example:
 *
 *     passport.use(new WorbliStrategy({
 *         clientID: '5cf9b5d6f393b4001c93653d',
 *         clientSecret: 'it-is-a-secret'
 *         callbackURL: 'https://www.example.net/worbli/oauth/callback',
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://oauth.dev.worbli.io';
  options.tokenURL = options.tokenURL || 'https://oauth.dev.worbli.io/api/oauth/access_token';
  options.customHeaders = options.customHeaders || {};
  options.state = true;
  OAuth2Strategy.call(this, options, verify);

  this.name = 'worbli';
  this._userProfileURL = options.userProfileURL || 'https://portal-api.dev.worbli.io/api/v3/user/me';
  this._oauth2.useAuthorizationHeaderforGET(true);
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from Worbli.
 *
 * This function constructs a normalized profile
 *
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
    var json;

    if (err) {
      console.log(err);
      if (err.data) {
        try {
          json = JSON.parse(err.data);
        } catch (_) {}
      }

      if (json && json.message) {
        return done(new APIError(json.message));
      }
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    var profile = Profile.parse(json);
    profile.provider  = 'worbli';
    profile._raw = body;
    profile._json = json;

    done(null, profile);
  });
}


// Expose constructor.
module.exports = Strategy;
