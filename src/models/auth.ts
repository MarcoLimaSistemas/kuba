export interface ISignInCredentials {
  email: string;
  password: string;
}
export interface IUpdatePassword {
  old_password: string;
  new_password: string;
}
export interface ISendEmail {
  email: string;
}
export interface ISendToken {
  email: string;
  token: string;
}
export interface IResetPassword {
  token: string;
  password: string;
  password_confirm: string;
}