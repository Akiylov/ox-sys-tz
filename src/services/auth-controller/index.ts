import axios from "axios";

export interface LoginRequest {
  username: string;
  password: string;
  subdomain: string;
}

export interface LoginResponse {
  token: string;
  lifetime: number; // seconds
}

/**
 * OX-SYS API bilan login qilish
 * Content-Type: application/x-www-form-urlencoded
 */
export async function loginRequest(data: LoginRequest): Promise<LoginResponse> {
  const url = `https://toko.ox-sys.com/security/auth_check`;

  // URLSearchParams bilan x-www-form-urlencoded format
  const body = new URLSearchParams();
  body.set("_username", data.username);
  body.set("_password", data.password);
  body.set("_subdomain", data.subdomain);

  const response = await axios.post<LoginResponse>(url, body.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    timeout: 10000,
  });

  return response.data;
}
