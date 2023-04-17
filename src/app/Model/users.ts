export interface IUserLogin{
  email: string;
  password: string;
}

export interface IUserRegister{
  full_name: string;
  email: string;
  password: string;
  repassword: string;
}

export class User{
  user_id!:string;
  email!:string;
  password!:string;
  full_name!:string;
  token!:string;
  role!:number;
  created!:string;
  updated!:string;
  ok!: boolean;
}
