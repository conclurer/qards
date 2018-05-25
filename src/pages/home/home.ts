import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubmitPage } from '../submit/submit';
import { ShowcasePage } from '../showcase/showcase';
import { Card } from '../../data/qard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public collection: Card[] = [
    {},
    {},
    {}
  ];

  constructor(public navCtrl: NavController, private readonly modalCtrl: ModalController) { }

  createCard() {
    this.modalCtrl.create(SubmitPage).present()
  }

  showCard(card: Card) {
    this.modalCtrl.create(ShowcasePage, {card}).present()
  }
}
