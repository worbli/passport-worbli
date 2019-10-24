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
    profile.displayName = [json.user.fname, json.user.mname, json.user.lname].join(" ");
    profile.name = {
      givenName: json.user.fname,
      middleName: json.user.mname,
      familyName: json.user.lname
    }
    profile.birthday = json.user.dob;
    profile.gender = json.user.gender;
    profile.emails = [
      {
        value: json.user.email,
        // type:
        // primary:
      }
    ];
    profile.phoneNumbers = [];
    // if (json.user.phone) {
    //   profile.phoneNumbers.push({
    //     value: jsom.phone,
    //     // type:
    //     // primary:
    //   })
    // }
    profile.addresses = [];
    // if (json.address) {
    //   profile.addresses.push({
    //       formatted: json.address,
    //       // formatted:  The full mailing address, formatted for display or use
    //       //             with a mailing label.  This field MAY contain newlines.  This is
    //       //             the Primary Sub-Field for this field, for the purposes of sorting
    //       //             and filtering.
    //       // streetAddress:  The full street address component, which may include
    //       //                 house number, street name, PO BOX, and multi-line extended street
    //       //                 address information.  This field MAY contain newlines.
    //       // locality:  The city or locality component.
    //       // region:  The state or region component.
    //       // postalCode:  The zipcode or postal code component.
    //       // country:  The country name component.
    //     }
    //   );
    // }

    profile.dateOfSigningUp = json.user.dos;
    profile.idType = json.iddoc.type;
    profile.idNumber = json.iddoc.number;
    profile.idCountry = json.iddoc.country;

    return profile;
  };