import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Login } from "../models/UserRequest/login";
import { User } from "../models/UserRequest/user";


@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  password: { headers?: HttpHeaders | { [header: string]: string | string[]; }; observe: "events"; context?: HttpContext; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; }; reportProgress?: boolean; responseType?: "json"; withCredentials?: boolean; };
  username: any;
  
    constructor(private http: HttpClient){}

    //private apiServer = " https://localhost:7129";

    private apiServer= " https://tweetappwithdocker.azurewebsites.net";
  
    public getAllUsers():Observable<User>{
        return this.http.get<User>(`${this.apiServer}/api/v1/tweets/users/all`);
    }

    public userLogin(userModel:Login):Observable<any>{
      //return this.http.get<Boolean>(`${this.apiServer}/api/v1/tweets/login/${username}/${password}`);
      return this.http.post(`${this.apiServer}/api/v1/tweets/login`,userModel,{responseType:'text'})
  }

  public userCreate(user: User):Observable<User>{
    return this.http.post<User>(`${this.apiServer}/api/v1/tweets/register`,user);
}

public changePassword(username: string,password:string){
  return this.http.post<Boolean>(`${this.apiServer}/api/v1/tweets/changePassword/${username}/${password}`,this.username,this.password)
}

public forgotPassword(username: string){
  return this.http.delete<Boolean>(`${this.apiServer}/api/v1/tweets/deletePassword/${username}`,this.username)
}
setSession(token: string) {
  localStorage.setItem('token', token);
}
}