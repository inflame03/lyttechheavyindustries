import { Injectable } from "angular2/core";

@Injectable()
export class Configuration {
    public Server: string = "http://localhost:62029/";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
    public MainController : string = "babu/";
    public DeleteController : string = "babuactions/";
}

