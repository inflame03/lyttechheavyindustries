/// <reference path="../../../typings/jquery/jquery.d.ts" />

"use strict";

// import Angular 2
import {Component, OnInit} from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { Router, RouteParams } from "angular2/router";

import { User } from "../../models/User";
import { UserDataService } from "../../core/services/user.service";
import { Configuration } from "../../core/commons/app.configs";

@Component({
	selector: "user-home",
	providers: [UserDataService, Configuration],
	templateUrl: "pages/user/user.template.html",
	directives: [CORE_DIRECTIVES]
})

export class UserComponent implements OnInit {
	public userList : Object[];
	selectedUser : User;

	constructor(
		private router: Router
		,private _userDataService : UserDataService
    		) {
		console.log('user component loaded');
	}
	ngOnInit() {
        this.getAllUsers();
		console.log("user component initialized");
    }
	private getAllUsers(): void 
	{
        this._userDataService
            .GetAll()
            .subscribe(
				(data) => this.userList = data
                ,error => console.log(error),
                () => console.log("Get all Items complete"));
			;
    }
	
	onSelect(user: User) { 
		this.selectedUser = user; 
	}
	
	gotoDetail() {
		this.router.navigate(['UserDetail', { id: this.selectedUser.id }]);
	}
	
	gotoCreateNew() {
		this.router.navigate(['UserDetail', { id: 0 }]);
	}
}
