export interface LoginRequest {
  username: string;
  password: string;
  subdomain: string;
}

export interface LoginResponse {
  token: string;
  lifetime: number; // seconds
}
