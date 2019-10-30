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

    const { id, user, iddoc, address } = json;

    var profile = {};
    profile.id = id;
    profile.displayName = [
      (user && user.fname) || "",
      (user && user.mname) || "",
      (user && user.lname) || "",
    ].join(" ");
    profile.name = {
      givenName: (user && user.fname) || "",
      middleName: (user && user.mname) || "",
      familyName: (user && user.lname) || "",
    }
    profile.birthday = (user && user.dob) || "";
    profile.gender = (user && user.gender) || "";
    profile.emails = [
      {
        value: (user && user.email) || "",
        // type:
        // primary:
      }
    ];
    profile.phoneNumbers = [];
    // if (user.phone) {
    //   profile.phoneNumbers.push({
    //     value: jsom.phone,
    //     // type:
    //     // primary:
    //   })
    // }
    profile.addresses = [];
    // if (address) {
    //   profile.addresses.push({
    //       formatted: address,
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

    profile.dateOfSigningUp = (user && user.dos) || "";
    profile.idType = (iddoc && iddoc.type) || "";
    profile.idNumber = (iddoc && iddoc.number) || "";
    profile.idCountry = (iddoc && iddoc.country) || "";

    return profile;
  };