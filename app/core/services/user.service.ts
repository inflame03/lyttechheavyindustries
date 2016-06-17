import { Component, Injectable } from "angular2/core";
import { Http, Response, Headers } from "angular2/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user";
import { Configuration } from "../commons/app.configs";

@Injectable()
export class UserDataService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {
    // constructor(private _http: Http) {
        this.actionUrl = _configuration.ServerWithApiUrl + "user/";
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }

    public GetAll = (): Observable<Response> => {
        return this._http.get(this.actionUrl).map(res => res.json());
    }
    public GetSingle = (id: number): Observable<Response> => {
        return this._http.get(this.actionUrl + id).map(res => res.json());
    }

    public Add = (item: User): Observable<Response> => {
        var toAdd = JSON.stringify(item);

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
                .map(res => res.json());
    }

    public Update = (id: number, itemToUpdate: User): Observable<Response> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate),
        { headers: this.headers }).map(res => res.json());
    }

    public Delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id);
    }
}

