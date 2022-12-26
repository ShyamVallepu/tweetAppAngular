import { Component, Input } from "@angular/core";
import { PostResponse } from "./PostResponse";

@Component({
    template: ''
})

export abstract class TweetInput {
    @Input() tweet!: PostResponse;
}