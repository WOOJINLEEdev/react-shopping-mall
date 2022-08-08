export function formatPhone(phoneNumber: string) {
  if (phoneNumber.length <= 10) {
    return [
      phoneNumber.substring(0, 2),
      phoneNumber.substring(2, 6),
      phoneNumber.substring(6),
    ].join("-");
  }

  return [
    phoneNumber.substring(0, 3),
    phoneNumber.substring(3, 7),
    phoneNumber.substring(7),
  ].join("-");
}

export function parsePhone(phoneNumber: string) {
  if (phoneNumber.length <= 10) {
    return newPhone(
      phoneNumber.substring(0, 2),
      phoneNumber.substring(2, 6),
      phoneNumber.substring(6),
    );
  }

  return newPhone(
    phoneNumber.substring(0, 3),
    phoneNumber.substring(3, 7),
    phoneNumber.substring(7),
  );
}

export function newPhone(tel1: string, tel2: string, tel3: string) {
  return {
    tel1,
    tel2,
    tel3,
  };
}
