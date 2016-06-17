/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-modal/angular-modal.d.ts" />

"use strict";

// import Angular 2
import { Component, OnInit } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { Router, RouteParams } from "angular2/router";
import { bootstrap } from "angular2/bootstrap";

import { FoodComponent } from "../../models/babu";
import { FoodDataService } from "../../core/services/babu.service";
import { Configuration } from "../../core/commons/app.configs";

// import jQuery = require('jquery');

@Component({
	selector: "food-home",
	providers: [FoodDataService, Configuration],
	templateUrl: "pages/food/food.template.html",
	directives: [CORE_DIRECTIVES]
})

export class FoodMainComponent implements OnInit {
	public foodList : Object[];
    private selectedType : string;
	private newItem : FoodComponent;
	private itemTypeList : FoodComponent[];
	itemTypeSelected : string;

	constructor(
			private router: Router
			,private _foodDataService : FoodDataService) {
		this.itemTypeList = ITEMTYPELIST;
		console.log('food component loaded');
	}

	ngOnInit() {

		this.selectedType = 'Condiment';

        this._foodDataService
            .GetItemListByType('Condiment')
            .subscribe(
                (data) => this.foodList = data 
				,error => console.log(error) 
				,() => console.log("Get item List complete")
			);
    }

    onChange(foodType : string) {
        console.log(foodType);
        this.selectedType = foodType;

        this._foodDataService
            .GetItemListByType(this.selectedType)
            .subscribe(
                (data) => this.foodList = data 
				,error => console.log(error) 
				,() => console.log("Get item list for " + foodType + " complete")
			);
    }

	onDelete(food: FoodComponent) {
		console.log( "DELETE THIS CLICKED! -- " + food );

		this._foodDataService
			.DeleteFoodItem(food)
			.subscribe(
				(data) => this.foodList = data
				,error => console.log(error)
				,() => console.log("Delete Item complete")
			);
	}
	
	saveNewFoodItem() : void {
		var newItem = new FoodComponent();

		var newName = document.getElementById('newName').value;
		
		newItem.ID = 0;
		// newItem.Name =  $('#newName').val();
		newItem.Name = newName;
		newItem.ItemType = this.selectedType;
		
		this._foodDataService
			.AddNewItem(newItem)
			.subscribe(
				(data) => this.foodList = data
				,error => console.log(error)
				,() => console.log("Add new Item complete")
			);

		document.getElementById('newName').value = "";
	}
	

	onSelect(food : FoodComponent ) {
		this.newItem = new FoodComponent();
		this.newItem.ID = food.ID;
		this.newItem.Name = food.Name;
		this.newItem.ItemType = this.selectedType;

		console.log( food );
	}
}

var ITEMTYPELIST: FoodComponent[] = [
  { "ID": 0, "Name": "Condiment", "ItemType": "Condiment" },
  { "ID": 0, "Name": "Spices", "ItemType": "Spices" },
  { "ID": 0, "Name": "Garnish", "ItemType": "Garnish" },
  { "ID": 0, "Name": "Ingredients", "ItemType": "Ingredients" },
  { "ID": 0, "Name": "Cooking Method", "ItemType": "CookingMethod" },
];



