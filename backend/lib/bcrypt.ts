import bcrypt from "bcryptjs";

export class Bcrypt {
  saltRound: number = 8;

  hash(password: string) {
    return bcrypt.hashSync(password, this.saltRound);
  }

  comparePasswords(password1: string, password2: string) {
    return bcrypt.compareSync(password1, password2);
  }
}
