import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";
import { Card } from "../../data/qard";

@Component({
  templateUrl: 'showcase.html'
})
export class ShowcasePage {
  public card: Card;

  constructor(private readonly viewCtrl: ViewController, navParams: NavParams) {
    this.card = navParams.get('card');
  }

  throwAway() {

  }

  keep() {
    this.viewCtrl.dismiss()
  }
}
