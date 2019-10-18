var chai = require('chai')
  , WorbliStrategy = require('../lib/strategy')
  , uri = require('url');;

describe('Strategy', function() {
  describe('constructed', function() {
    describe('with normal options', function() {
      var strategy = new WorbliStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      }, function() {});

      it('should be named worbli', function() {
        expect(strategy.name).to.equal('worbli');
      });
    }); // with normal options

    describe('with undefined options', function() {
      it('should throw', function() {
        expect(function() {
          var strategy = new WorbliStrategy(undefined, function(){});
        }).to.throw(Error);
      });
    }); // with undefined options
  }); // constructed

  describe('issuing authorization request', function() {
    describe('that redirects to service provider', function() {
      var strategy = new WorbliStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        callbackURL: 'http://localhost:3030/worbli/callback',

        authorizationURL: 'http://localhost:5000',
        tokenURL: 'http://localhost:5000/oauth2/token',
      }, function() {});

      var url;

      before(function(done) {
        chai.passport.use(strategy)
          .redirect(function(u) {
            url = u;
            done();
          })
          .req(function(req) {
            req.session = {};
          })
          .authenticate();
      });

      it('should be redirected', function() {
        let u = uri.parse(url, true);
        expect(u.host).to.equal('localhost:5000');
        expect(u.query.response_type).to.equal('code');
        expect(u.query.client_id).to.equal('ABC123');
      });
    }); // that redirects to service provider

    describe('failure caused by user denying request', function() {
      var strategy = new WorbliStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        callbackURL: 'http://localhost:3030/worbli/callback',

        authorizationURL: 'http://localhost:5000',
        tokenURL: 'http://localhost:5000/oauth2/token',
      }, function() {});

      var info;

      before(function(done) {
        chai.passport.use(strategy)
          .fail(function(i) {
            info = i;
            done();
          })
          .req(function(req) {
            req.session = {};
            req.query = {};
            req.query.error = 'access_denied';
            req.query.error_description  = 'Application is not authorized';
          })
          .authenticate();
      });

      it('should fail with info', function() {
        expect(info).to.not.be.undefined;
        expect(info.message).to.equal('Application is not authorized');
      });
    }); // failure caused by user denying request

    // describe('that was approved using verify callback', function() {
    //   var strategy = new WorbliStrategy({
    //     clientID: 'ABC123',
    //     clientSecret: 'secret',
    //     callbackURL: 'http://localhost:3030/worbli/callback',

    //     authorizationURL: 'http://localhost:5000',
    //     tokenURL: 'http://localhost:5000/oauth2/token',
    //   }, function(accessToken, refreshToken, profile, done) {
    //     if (accessToken !== '2YotnFZFEjr1zCsicMWpAA') { return done(new Error('incorrect accessToken argument')); }
    //     if (options.grant_type !== 'authorization_code') { return callback(new Error('incorrect options.grant_type argument')); }
    //     if (Object.keys(profile).length !== 0) { return done(new Error('incorrect profile argument')); }

    //     return done(null, { id: '1234' }, { message: 'Hello' });
    //   });

    //   strategy._oauth2.getOAuthAccessToken = function(code, options, callback) {
    //     if (code !== 'SplxlOBeZQQYbYS6WxSbIA') { return callback(new Error('incorrect code argument')); }
    //     if (options.grant_type !== 'authorization_code') { return callback(new Error('incorrect options.grant_type argument')); }
    //     if (options.redirect_uri !== 'http://localhost:3030/worbli/callback') { return callback(new Error('incorrect options.redirect_uri argument')); }

    //     return callback(null, '2YotnFZFEjr1zCsicMWpAA', 'tGzv3JOkF0XG5Qx2TlKWIA', { token_type: 'example' });
    //   }

    //   var user
    //     , info;

    //   before(function(done) {
    //     chai.passport.use(strategy)
    //       .success(function(u, i) {
    //         user = u;
    //         info = i;
    //         done();
    //       })
    //       .req(function(req) {
    //         req.session = {};
    //         req.session['oauth2:localhost'] = {};
    //         req.session['oauth2:localhost']['state'] = 'DkbychwKu8kBaJoLE5yeR5NK';

    //         req.query = {};
    //         req.query.code = 'SplxlOBeZQQYbYS6WxSbIA';
    //         req.query.state = 'DkbychwKu8kBaJoLE5yeR5NK';
    //       })
    //       .authenticate();
    //   });

    //   it('should supply user', function() {
    //     expect(user).to.be.an.object;
    //     expect(user.id).to.equal('1234');
    //   });

    //   it('should supply info', function() {
    //     expect(info).to.be.an.object;
    //     expect(info.message).to.equal('Hello');
    //   });
    // }); // that was approved using verify callback
  }); // issuing authorization request

});
