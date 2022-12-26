import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LikeRequest } from "../models/Like/likeRequest";


@Injectable({
    providedIn: 'root'
})
export class LikeService {

    constructor(private http: HttpClient) { }


    //private apiServer =" https://localhost:7129";

    private apiServer= "https://tweetappwithdocker.azurewebsites.net";

    private localUser = localStorage.getItem('currentUser');

    private username = this.localUser.replace('"','').replace('"','');

    public getLike(tweetid: string): Observable<boolean> { // tweetid is integer
        return this.http.get<boolean>(`${this.apiServer}/api/v1/tweets/${this.username}/getlike/${tweetid}`);
    }
    public likeUpdate(likeUpdateBoolean: LikeRequest,tweetid: string):Observable<LikeRequest>{ // tweetid is integer
        return this.http.post<LikeRequest>(`${this.apiServer}/api/v1/tweets/${this.username}/likeupdate/${tweetid}`,likeUpdateBoolean);
    }
}
