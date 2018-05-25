import { Component } from '@angular/core';
import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { ShowcasePage } from '../showcase/showcase';
import { mockedCard } from '../../data/qard';

@Component({
  templateUrl: 'submit.html'
})
export class SubmitPage {
  public title = '';
  private readonly image: string | null;

  constructor(
    private readonly viewCtrl: ViewController,
    private readonly modalCtrl: ModalController,
    navParams: NavParams
  ) {
    this.image = navParams.get('image') || null;
  }

  abort() {
    this.viewCtrl.dismiss();
  }

  titleDidChange(newTitle: string) {
    this.title = newTitle.trim();
  }

  cannotSubmit(): boolean {
    return !(this.title.length > 3);
  }

  async submit() {
    await this.viewCtrl.dismiss();
    this.modalCtrl
      .create(ShowcasePage, { card: mockedCard(this.title, 10) })
      .present();
  }
}
