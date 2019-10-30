const Profile = require('../lib/profile')
  , fs = require('fs');


describe('Profile.parse', function() {

  describe('profile obtained from user with all data', function() {
    var profile;

    before(function(done) {
      fs.readFile('test/fixtures/user.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.id).to.equal('1');
      expect(profile.displayName).to.equal('Bill Jone Topper');
      expect(profile.emails).to.have.length(1);
      expect(profile.emails[0].value).to.equal('user@example.com');
    });
  });

  describe('profile obtained from user with partial data', function() {
    var profile;

    before(function(done) {
      fs.readFile('test/fixtures/user-partial.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.id).to.equal('1');
    });
  });
});