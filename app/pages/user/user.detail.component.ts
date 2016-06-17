/// <reference path="../../../typings/jquery/jquery.d.ts" />

"use strict";

// import Angular 2
import { Component, OnInit } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { Router, RouteParams } from "angular2/router";

import { User } from "../../models/User";
import { UserDataService } from "../../core/services/user.service";
import { Configuration } from "../../core/commons/app.configs";

@Component({
	selector: "user-detail-home",
	providers: [UserDataService, Configuration],
	templateUrl: "pages/user/user.detail.template.html",
	directives: [CORE_DIRECTIVES]
})

export class UserDetailComponent implements OnInit {
	user : User;
	newUser : boolean;
	newCancelText : string;
	actionText : string;
	headerText : string;

	constructor(
			private router: Router
			,private _userDataService : UserDataService
            ,private routeParams: RouteParams) {
		this.newUser = false;
		this.newCancelText = "Create New User";
		this.actionText = "Update User Info";
	}
	
	ngOnInit() {
        let id = +this.routeParams.get('id');
		
		if( id > 0 ) {
			this.getUser(id);
		}
		else {
			this.newUserFunction();
		}
    }
	
	private getUser(id : number) : void {
		this._userDataService
			.GetSingle(id)
			.subscribe(
				(data) => this.user = data
				,error => console.log(error)
				,() => console.log("Get single Item complete")
			);
		
	}
	
	newUserFunction() : void {
		
		if( this.newUser === true )
		{
			this.router.navigate(['User']);
		}
		else
		{
			this.user = null;
			this.newUser = true;
			
			this.newCancelText = "Cancel";
			this.actionText = "Create new User";
		}
	}
	
	doSaveAction() : void {
		if( !this.user ) {// save action
			this.saveNewUserDetails();
		}
		else {
			this.editUserDetails();
		}
			
	}
	
	editUserDetails() : void {
		this._userDataService
			.Update(this.user.id, this.user)
			.subscribe(
				(data) => this.router.navigate(['User']) 
				,error => console.log(error)
				,() => console.log("Add new Item complete")
			);
		
	}
	
	saveNewUserDetails() : void {
		var newUser = new User();
		
		var newName = document.getElementById('newName').value;
		var newUserName = document.getElementById('newUserName').value;  

		// newUser.name = $('#newName').val();
		// newUser.userName = $('#newUserName').val();
		newUser.name = newName;
		newUser.userName = newUserName;
		
		this._userDataService
			.Add(newUser)
			.subscribe(
				(data) => this.router.navigate(['UserDetail', { id: data.id }]) //function() {this.user = data; this.newUser = null;}
				,error => console.log(error)
				,() => console.log("Add new Item complete")
			);
	}
	
	goBack() {
		window.history.back();
	}
    	
}
