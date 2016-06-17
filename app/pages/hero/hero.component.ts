import { Component } from "angular2/core";

import { Hero } from "../../models/hero";

@Component({
  selector: "herotemp",
  templateUrl: "pages/hero/hero.template.html",
	directives: []
})

export class HeroComponent {
  title = "fckit";
  hero: Hero = {
    id: 1,
    name: "Windstorm"
  };
  heroes = HEROES;
  selectedHero: Hero;
}

var HEROES: Hero[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];

