import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/TweetRequest/post';
import { ReTweetPost } from '../models/TweetRequest/retweetPost';
import { RetweetRequest } from '../models/TweetRequest/reTweetRequest';
import { PostService } from '../service/PostService';
import { ReTweetService } from '../service/ReTweetService';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  userName: string = localStorage.getItem('currentUser');
  username = this.userName.replace('"', '').replace('"', '');
  tweet: Post[] | undefined;
  tweetPost: Post;

  tweetForm = new FormGroup({
    tweetText: new FormControl("",{
      validators: [Validators.required, Validators.maxLength(144)]
    }),
  });

  reTweetForm = new FormGroup({
    retweet: new FormControl("",{
      validators: [Validators.required, Validators.maxLength(144)]
    }),
  });
  reTweets: ReTweetPost[];


  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router,private retweetService: ReTweetService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
   this.getAllTweets();
  }

  ngOnInit(): void {
    this.getAllTweets()
  }

  public getAllTweets() {
    this.postService.getAllTweets().subscribe(
      (response: Post[]) => {
        this.tweet = response;
        console.log(this.tweet);
        if (this.tweet) {
          for (let index = 0; index < this.tweet.length; index++) {
            let datevalue = this.tweet[index].tweetDate;
            this.tweet[index].localDate = new Date(datevalue).toLocaleDateString();
          }
        }
      },
    )
  }
  createPost() {
    this.tweetPost = new Post(); {
      this.tweetPost.tweet = this.tweetForm.value.tweetText;
      this.tweetPost.userName = localStorage.getItem('currentUser');
      this.tweetPost.userName=this.tweetPost.userName.replace('"','').replace('"','');
      this.tweetPost.likeCount = 0;
      console.log(this.tweetPost);
    }

    this.postService.postCreate(this.tweetPost).subscribe(
      (response: Post) => {
        this.tweetPost = response;
        if (this.tweetPost !== null) {
          alert("Post Successfull")
        }
        this.getAllTweets();
      })
  }
  createRetweet(tweetid){
   
    let newRetweet = new RetweetRequest();{
      newRetweet.retweet = this.reTweetForm.value.retweet;
   
    }

    this.retweetService.reTweetCreate(tweetid,newRetweet).subscribe(
      (response: RetweetRequest) => {
        newRetweet = response;
        if(newRetweet !== null){
          alert("ReTweet Successfull")
        }
        this.getAllTweets();
      }
    )
  }

}
