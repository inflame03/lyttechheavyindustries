"use strict";

// import Angular 2
import {Component} from "angular2/core";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

// app components
import {Home} from "../pages/home/home";
import {HeroComponent} from "../pages/hero/hero.component";
import {UserComponent} from "../pages/user/user.component";
import {UserDetailComponent} from "../pages/user/user.detail.component";
import {FoodMainComponent} from "../pages/food/food.component";

// app services
//import {appServicesInjectables} from "core/services/services";

@Component({
	selector: "app",
	templateUrl: "core/app.template.html", //template: "<router-outlet></router-outlet>",
	directives: [RouterOutlet, RouterLink]
})

@RouteConfig([
	{ 
		path: "/", 
		component: Home, 
		as: "Home", 
		data: undefined 
	} // the as serves as alias for links, etc
	,{ 
		path: "/user", 
		component: UserComponent, 
		as: "User", 
		data: undefined 
	}
	,{ 
		path: "/user/:id", 
		component: UserDetailComponent, 
		as: "UserDetail", 
		data: undefined }
	,{ 
		path: "/hero", 
		component: HeroComponent, 
		as: "Hero", 
		data: undefined 
	}
	,{ 
		path: "/food", 
		component: FoodMainComponent, 
		as: "FoodMain", 
		data: undefined 
	}
])

export class App {
	constructor() {
		console.log("Application bootstrapped!");
	}
}

