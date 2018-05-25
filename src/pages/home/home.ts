import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubmitPage } from '../submit/submit';
import { ShowcasePage } from '../showcase/showcase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private readonly modalCtrl: ModalController) { }

  createCard() {
    this.modalCtrl.create(SubmitPage).present()
  }

  showCard() {
    this.modalCtrl.create(ShowcasePage).present()
  }
}
