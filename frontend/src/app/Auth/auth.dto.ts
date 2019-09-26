export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  auth: boolean;
  token: string;
  expiresIn: string;
  user_id: string;
}

export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}
