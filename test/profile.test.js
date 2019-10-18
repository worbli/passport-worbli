const Profile = require('../lib/profile')
  , fs = require('fs');


describe('Profile.parse', function() {

  describe('profile obtained from Users documentation on 2016/02/02', function() {
    var profile;

    before(function(done) {
      fs.readFile('test/fixtures/user.json', 'utf8', function(err, data) {
        if (err) { return done(err); }
        // profile = Profile.parse(data);
        done();
      });
    });

    it('should parse profile', function() {
      // expect(profile.id).to.equal('1');
      // expect(profile.username).to.equal('octocat');
      // expect(profile.displayName).to.equal('monalisa octocat');
      // expect(profile.profileUrl).to.equal('https://github.com/octocat');
      // expect(profile.emails).to.have.length(1);
      // expect(profile.emails[0].value).to.equal('octocat@github.com');
      // expect(profile.photos).to.have.length(1);
      // expect(profile.photos[0].value).to.equal('https://github.com/images/error/octocat_happy.gif');
    });
  });
});