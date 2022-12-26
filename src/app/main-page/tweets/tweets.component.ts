import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/TweetRequest/post';
import { ReTweetPost } from 'src/app/models/TweetRequest/retweetPost';
import { PostService } from 'src/app/service/PostService';
import { ReTweetService } from 'src/app/service/ReTweetService';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  username :string = localStorage.getItem('currentUser');
  localuser = this.username.replace('"','').replace('"','');
  tweetPost: Post[];


  tweetForm = new FormGroup({
    tweetText: new FormControl("", Validators.required),
  });
  reTweets: ReTweetPost[];
    constructor(private postService: PostService,private router:Router,private reTweetService:ReTweetService) { }

  ngOnInit()  {
    this.getAllTweetsOfUserName(this.localuser);
  }

  

  public getAllTweetsOfUserName(localuser){
    this.postService.getAllTweetsOfUsername(this.localuser).subscribe(
      (response: Post[]) => {
        this.tweetPost = response;
        if (this.tweetPost) {
          for (let index = 0; index < this.tweetPost.length; index++) {
            let datevalue = this.tweetPost[index].tweetDate;
            this.tweetPost[index].localDate = new Date(datevalue).toLocaleDateString();
          }
        }
      },   
    )
  }
  
  createPost(){
   
    let newtweet = new Post();{
    newtweet.tweet = this.tweetForm.value.tweetText;
    newtweet.userName = localStorage.getItem('currentUser');
    newtweet.likeCount = 0;
    }

    this.postService.postCreate(newtweet).subscribe(
      (response: Post) => {
        newtweet = response;
        if(newtweet !== null){
          alert("Post Successfull")
        }
      }
    )
  }

  deletePost(tweetid){
    
    this.postService.deleteTweet(tweetid).subscribe( 
      (data:any)=>{
       this.getAllTweetsOfUserName(this.localuser);
      }
    );
  }
  public getAllReTweets(tweetid){
    this.postService.getAllReTweets(tweetid).subscribe(
      (response: ReTweetPost[]) => {
        this.reTweets = response;
        // if (this.reTweets) {
        //   for (let index = 0; index < this.reTweets.length; index++) {
        //     let datevalue = this.reTweets[index].retweettime;
        //     this.reTweets[index].localDate = new Date(datevalue).toLocaleDateString();
        //   }
        // }
      },   
    )
  }

  deleteReTweet(retweetid){
    this.reTweetService.deleteReTweet(retweetid).subscribe( 
    );
  }

}
