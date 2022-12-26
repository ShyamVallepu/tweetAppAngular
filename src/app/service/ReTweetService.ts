import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RetweetRequest } from "../models/TweetRequest/reTweetRequest";


@Injectable({
    providedIn: 'root'
})
export class ReTweetService {

    constructor(private http: HttpClient) { }

    //private apiServer=" https://localhost:7129";

    private apiServer= "https://tweetappwithdocker.azurewebsites.net";

    private localUser = localStorage.getItem('currentUser');

    localuser = this.localUser.replace('"','').replace('"','');


    public reTweetCreate(tweetid:string, retweetRequest: RetweetRequest):Observable<RetweetRequest>{ // tweetid is integer
        return this.http.post<RetweetRequest>(`${this.apiServer}/api/v1/tweets/${this.localuser}/addRetweet/${tweetid}`,retweetRequest);
    }

    public deleteReTweet(reTweetid: number): Observable<any> {
        return this.http.delete<any>(`${this.apiServer}/api/v1/tweets/${this.localuser}/deleteRetweet/${reTweetid}`);
    }
}