import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<JwtPayload>(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return this.getToken() && !this.isTokenExpired(this.getToken());
  }

  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decodedToken = jwtDecode<JwtPayload>(token);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp! * 1000 < currentDate.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem("token") || "";
    return token;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem("token", idToken);
    // TODO: redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem("token");
    // TODO: redirect to the login page
    window.location.assign("/login");
  }
}

export default new AuthService();
