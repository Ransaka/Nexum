// Signin request interface
export interface SignInRequest {
  email: string;
  password: string;
}

// Signin response interface
export interface SignInResponse {
  auth: boolean;
  token: string;
  expiresIn: string;
  user_id: string;
}

// Signup request interface
export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}

export interface NewComplain {
  seller: string;
  complain:string;
  
 // seller: string;
 // item: string;
}
