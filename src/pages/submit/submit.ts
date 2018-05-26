import { Component } from '@angular/core';
import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { ShowcasePage } from '../showcase/showcase';
import { mockedCard } from '../../data/qard';
import { QardsDatabase } from 'qards-lib'
import { SessionService } from '../../data/session';

@Component({
  templateUrl: 'submit.html'
})
export class SubmitPage {
  public title = '';
  private readonly image: string | null;

  constructor(
    private readonly viewCtrl: ViewController,
    private readonly modalCtrl: ModalController,
    private readonly database: QardsDatabase,
    private readonly session: SessionService,
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
    const card = {
      comments: [],
      creatorId: this.session.uid$.value!,
      holderHistory: [],
      holderId: null,
      imageId: 'nope',
      imageUrl: 'http://placegoat.com/1000/1000',
      location: {
        lat: 10,
        lng: 48
      },
      score: 9000 + 1,
      tags: [],
      title: this.title,
    }
    await this.database.createCard(card)
    this.modalCtrl
      .create(ShowcasePage, { card })
      .present();
  }
}
