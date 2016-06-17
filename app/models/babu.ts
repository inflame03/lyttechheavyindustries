export class FoodComponent
{
    ID : number;
    Name : string;
    ItemType : string;

}

export class Condiments extends FoodComponent
{
    ServingStyle : string;
}

export class CookingMethod extends FoodComponent
{
    CookingTime : number;
    MaxCookingTime : number;
}

export class Garnish extends FoodComponent
{
    ServingStyle : string;
    AddTime : string;
}

export class Ingredients extends FoodComponent
{
    preparationType : string;
}

export class Spices extends FoodComponent
{
    toTaste : boolean;
}
