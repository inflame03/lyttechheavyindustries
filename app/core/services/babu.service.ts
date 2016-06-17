import { Component, Injectable } from "angular2/core";
import { Http, Response, Headers } from "angular2/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { FoodComponent } from "../../models/babu";
import { Configuration } from "../commons/app.configs";

@Injectable()
export class FoodDataService {

    private actionUrl: string;
    private headers: Headers;
    private _config : Configuration;

    constructor(private _http: Http, private _configuration: Configuration) {
        this._config = _configuration;
        this.actionUrl = _configuration.ServerWithApiUrl 
                + _configuration.MainController;
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
        // this.headers.append("Access-Control-Allow-Origin", "http://10.194.203.106:3000");
        
    }

    public GetItemListByType = (type: string): Observable<Response> => {
        return this._http.get(this.actionUrl + "GetByType/" + type)
            .map(res => res.json());
    }

    public AddNewItem = (item: FoodComponent): Observable<Response> => {
        var toAdd = JSON.stringify(item);

        return this._http.post(this.actionUrl + "SaveNewItem/" , 
                toAdd, { headers: this.headers })
                .map(res => res.json());
    }

    public DeleteFoodItem = (item: FoodComponent): Observable<Response> => {

        var toAdd = JSON.stringify(item);

        var url = this._config.ServerWithApiUrl + this._config.DeleteController;

        return this._http.post(url + "DeleteItem/" , 
                toAdd, { headers: this.headers })
                .map(res => res.json());
    }

}

