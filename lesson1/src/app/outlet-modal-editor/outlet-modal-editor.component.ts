import { Component, OnInit, ViewChild } from '@angular/core';
import { Information, UserRightsObj } from '../news/news-types';
import { PostEditorComponent } from '../news/post-editor/post-editor.component';
import { PostsService } from '../news/posts.service';

@Component({
  selector: 'app-outlet-modal-editor',
  templateUrl: './outlet-modal-editor.component.html',
  styleUrls: ['./outlet-modal-editor.component.css']
})
export class OutletModalEditorComponent implements OnInit {

  @ViewChild('modalWindowPostEdit') modalWindowPost!: PostEditorComponent;
  public editedPost!: Information;
  public userRights: UserRightsObj = {isUsercanDeleteNews: true, isUsercanEditNews: true};
  public editorTitle?: string;


  constructor(private _postService: PostsService) { }

  ngOnInit(): void {
  }



  onSavePost($event: Information){    
    this._postService.savePost($event);
    this.modalWindowPost.show(false);
  }

  onCancelEditPost(){   
    this.modalWindowPost.show(false);
  } 

}
