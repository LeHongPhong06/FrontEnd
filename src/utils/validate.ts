export class Validate {
  static Email(mail: string) {
    if (/^[a-zA-Z0-9_.+\-]+@gmail.com$/.test(mail)) {
      return true;
    }
    return false;
  }

  static Password = (val: string) => {
    return val.length >= 6;
  };
}
