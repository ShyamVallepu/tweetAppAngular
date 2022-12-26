import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/TweetRequest/post";
import { ReTweetPost } from "../models/TweetRequest/retweetPost";
import { TweetResponse } from "../models/TweetRequest/tweetResponse";


@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) { }

    //private apiServer = " https://localhost:7129";

    private apiServer= " https://tweetappwithdocker.azurewebsites.net";

    private localUser = localStorage.getItem('currentUser');

    localuser = this.localUser.replace('"','').replace('"','');

    public getAllTweets(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiServer}/api/v1/tweets/all`);
    }

    public getAllTweetsOfUsername(username:string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiServer}/api/v1/tweets/${username}`);
    }
    public postCreate(post: Post):Observable<Post>{
        return this.http.post<Post>(`${this.apiServer}/api/v1/tweets/${this.localuser}/add`,post);
    }
    public postUpdate(post: Post,tweetid: string):Observable<Post>{ //tweetid is integer
        return this.http.put<Post>(`${this.apiServer}/api/v1/tweets/${this.localuser}/update/${tweetid}`,post);
    }

    public getAllReTweets(tweetid: number): Observable<ReTweetPost[]> {
        return this.http.get<ReTweetPost[]>(`${this.apiServer}/api/v1/tweets/allRetweets/${tweetid}`);
    }

    public getLikeCount(tweetid: string): Observable<Post> { //tweetid is integer
        return this.http.get<Post>(`${this.apiServer}/api/v1/tweets/likeCount/${tweetid}`);
    }

    public getTweetsOfTweetId(tweetid: string): Observable<TweetResponse> { // tweetid is integer
        return this.http.get<TweetResponse>(`${this.apiServer}/api/v1/tweets/getTweet/${tweetid}`);
    }

    public deleteTweet(tweetid: number): Observable<TweetResponse> {
        return this.http.delete<TweetResponse>(`${this.apiServer}/api/v1/tweets/${this.localuser}/delete/${tweetid}`);
    }

}