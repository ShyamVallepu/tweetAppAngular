import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/TweetRequest/post';
import { PostService } from 'src/app/service/PostService';

@Component({
  selector: 'app-update-tweet',
  templateUrl: './update-tweet.component.html',
  styleUrls: ['./update-tweet.component.css']
})
export class UpdateTweetComponent implements OnInit {

  userName :string = localStorage.getItem('currentUser');
  username = this.userName.replace('"','').replace('"','');

  tweetForm = new FormGroup({
    newTweet: new FormControl("", Validators.required),
  });
  tweetid: string;
  tweets:Post;
  tweetMessage: string;
  tweetPost: Post;

  constructor(private postService: PostService,private route: ActivatedRoute,private router:Router){

  }

  ngOnInit(){
    this.route.queryParams.subscribe(
      params => {
        this.tweetid =  params['tweetid'];
      }
    )

      this.getTweetById()
  }

  public getTweetById(){
    this.postService.getTweetsOfTweetId(this.tweetid).subscribe(
      (response: Post) => {
        this.tweetMessage = response.tweet;
      },   
    )
  }

  postUpdate(){
    this.tweetPost = new Post();{
    this.tweetPost.tweet = this.tweetForm.value.newTweet;
    }

    this.postService.postUpdate(this.tweetPost,this.tweetid).subscribe(
      (response: Post) => {
        this.tweetPost = response;
        if(this.tweetPost !== null){
          alert("Update Successfull")
          this.router.navigate(['tweets']);
        }})}

}
