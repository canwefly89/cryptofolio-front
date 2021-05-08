/**
 *
 * @param {object} inputData Option for audioContext
 * @returns Created audioContext
 */
const validateInput = (inputData) => {
  const { email, name, password, passwordConfirm } = inputData;
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const NAME_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*$/;

  if (!EMAIL_REGEX.test(email)) {
    return "잘못된 이메일 형식입니다.";
  }

  if (!NAME_REGEX.test(name)) {
    return "잘못된 이름 형식입니다.";
  }

  if (password.length < 8) {
    return "비밀번호는 8자리 이상이어야 합니다.";
  }

  if (passwordConfirm && password !== passwordConfirm) {
    return "비밀번호가 일치하지 않습니다.";
  }
};

export default validateInput;
