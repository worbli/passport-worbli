/**
 * Parse profile.
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function(json) {
    if ('string' == typeof json) {
      json = JSON.parse(json);
    }

    var profile = {};
    profile.id = json.id;
    profile.displayName = [json.fname, json.mname, json.lname].join(" ");
    profile.name = {
      givenName: json.fname,
      middleName: json.mname,
      familyName: json.lname
    }
    profile.birthday = json.dob;
    profile.gender = json.gender;
    profile.emails = [
      {
        value: json.email,
        // type:
        // primary:
      }
    ];
    profile.phoneNumbers = [];
    if (json.phone) {
      profile.phoneNumbers.push({
        value: jsom.phone,
        // type:
        // primary:
      })
    }
    profile.addresses = [];
    if (json.address) {
      profile.addresses.push({
          formatted: json.address,
          // formatted:  The full mailing address, formatted for display or use
          //             with a mailing label.  This field MAY contain newlines.  This is
          //             the Primary Sub-Field for this field, for the purposes of sorting
          //             and filtering.
          // streetAddress:  The full street address component, which may include
          //                 house number, street name, PO BOX, and multi-line extended street
          //                 address information.  This field MAY contain newlines.
          // locality:  The city or locality component.
          // region:  The state or region component.
          // postalCode:  The zipcode or postal code component.
          // country:  The country name component.
        }
      );
    }

    profile.dateOfSigningUp = json.dos;
    profile.worbliAccountNames = json.netaccs;
    profile.idType = json.idtype;
    profile.idNumber = json.idnumber;
    profile.idState = json.idstate;

    return profile;
  };