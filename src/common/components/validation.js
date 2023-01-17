import constants from '../../utils/constants';

/* To handle first name validation*/
export const validateName = name => {
  var nameRegex = /^[a-zA-Z ]+$/;
  var name = name.trim();
  if (name == '' || name == undefined || name == null) {
    return {status: false, error: constants.WARNING.NAME};
  } else if (!nameRegex.test(name)) {
    return {status: false, error: constants.WARNING.NAME_INV};
  } else if (name.length < 2) {
    return {status: false, error: constants.WARNING.NAME_CHAR};
  } else {
    return {status: true, error: ''};
  }
};

export const validateAddress = address => {
  var address = address.trim();
  if (address == '' || address == undefined || address == null) {
    return {status: false, error: constants.WARNING.ADDRESS};
  } else {
    return {status: true, error: ''};
  }
};

/* To handle email validation */
export const validateEmail = email => {
  var emailRegex = /^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i;
  email = email.trim();
  if (email == '' || email == undefined || email == null) {
    return {status: false, error: constants.WARNING.EMAIL};
  } else if (!emailRegex.test(email)) {
    return {status: false, error: constants.WARNING.EMAIL_INV};
  } else {
    return {status: true, error: ''};
  }
};
/* To handle email validation */
export const validateArticleName = name => {
  var articleNameRegex = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/g;
  name = name.trim();
  if (name == '' || name == undefined || name == null) {
    return {status: false, error: constants.WARNING.PRODUCT_INV};
  } else if (articleNameRegex.test(name)) {
    return {status: false, error: constants.WARNING.PRODUCT_INV_SPECIAL};
  } else {
    return {status: true, error: ''};
  }
};
/* To validate password */

export const validatePassword = password => {
  // var passwordRegex = /^ (?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  password = password.trim();

  if (password == '' || password == undefined || password == null) {
    return {status: false, error: constants.WARNING.PASSWORD};
  } else if (!passwordRegex.test(password)) {
    return {
      status: false,
      error: constants.WARNING.PASSWORD_INV,
    };
  } else {
    return {status: true, error: ''};
  }
};

//Validate Pasword weak
export const validatePasswordWeak = password => {
  // var passwordRegex = /^ (?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  var passwordRegex = /^[^\s]+$/;
  //password = password.trim();

  if (password == '' || password == undefined || password == null) {
    return {status: false, error: constants.WARNING.PASSWORD};
  } else if (password.length < 6) {
    return {
      status: false,
      error: constants.WARNING.PASSWORD_INV,
    };
  } else if (!passwordRegex.test(password)) {
    return {
      status: false,
      error: constants.WARNING.PASSWORD_INV_WHITE,
    };
  } else {
    return {status: true, error: ''};
  }
};

/* To validate Mobile No. */

export const validateMobileNo = mobileNo => {
  var numberRegex = /^[1-9][0-9]{7,9}$/;
  mobileNo = mobileNo.trim();
  if (mobileNo == '' || mobileNo == undefined || mobileNo == null) {
    return {status: false, error: constants.WARNING.MOBILE};
  } else if (!numberRegex.test(mobileNo)) {
    return {status: false, error: constants.WARNING.MOBILE_INV};
  } else {
    return {status: true, error: ''};
  }
};

export const validatePinCode = pincode => {
  pincode = pincode.trim();
  if (pincode == '' || pincode == undefined || pincode == null) {
    return {status: false, error: constants.WARNING.PINCODE_INV};
  } else if (pincode.length < 6) {
    return {status: false, error: constants.WARNING.PINCODE};
  } else {
    return {status: true, error: ''};
  }
};

export const requireEmail = userId => {
  let userEmail = userId.toString().trim();
  if (userEmail == '' || userEmail == undefined || userEmail == null) {
    return {status: false, error: constants.WARNING.EMAIL};
  } else return {status: true, error: ''};
};

/* To Handle Password validation on Login */

export const requirePassword = password => {
  let userPassword = password.toString().trim();
  if (userPassword == '' || userPassword == undefined || userPassword == null) {
    return {status: false, error: constants.WARNING.PASSWORD};
  } else return {status: true, error: ''};
};
export const validateDistance = age => {
  let userAge = age.toString().trim();
  if (
    userAge == '' ||
    userAge == undefined ||
    userAge == null ||
    +userAge > 10 ||
    +userAge < 1 ||
    isNaN(userAge)
  ) {
    return {
      status: false,
      error: constants.WARNING.DISTANCE_INV,
    };
  } else return {status: true, error: ''};
};
export const validateAge = age => {
  let userAge = age.toString().trim();
  if (
    userAge == '' ||
    userAge == undefined ||
    userAge == null ||
    userAge * 1 < 18
  ) {
    return {
      status: false,
      error: constants.WARNING.AGE_INV,
    };
  } else return {status: true, error: ''};
};
export const requireField = (userId, type = '') => {
  let userEmail = userId.toString().trim();
  if (userEmail == '' || userEmail == undefined || userEmail == null) {
    return {
      status: false,
      error:
        type === ''
          ? constants.WARNING.GEN_BLANK
          : type.concat(constants.WARNING.GEN_BLANK_GEN),
    };
  } else return {status: true, error: ''};
};
export const validateNumber = mobileNo => {
  var numberRegex = /^[0-9]*$/;
  mobileNo = mobileNo.trim();
  if (mobileNo == '' || mobileNo == undefined || mobileNo == null) {
    return {status: false, error: constants.WARNING.NUMBER};
  } else if (!numberRegex.test(mobileNo)) {
    return {status: false, error: constants.WARNING.NUMBER_INV};
  } else {
    return {status: true, error: ''};
  }
};
