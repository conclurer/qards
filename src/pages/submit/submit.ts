import { Component } from '@angular/core';
import { ViewController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { ShowcasePage } from '../showcase/showcase';
import { mockedCard } from '../../data/qard';
import qards, { QardsDatabase, QardsStorage } from 'qards-lib';
import { SessionService } from '../../data/session';

@Component({
  templateUrl: 'submit.html'
})
export class SubmitPage {
  public title = '';
  public readonly image: string | null;

  constructor(
    private readonly viewCtrl: ViewController,
    private readonly modalCtrl: ModalController,
    private readonly database: QardsDatabase,
    private readonly session: SessionService,
    private readonly loadingCtrl: LoadingController,
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
    const loading = this.loadingCtrl.create();
    try {
      loading.present();
      const imageId = Date.now().toString()
      const storage = new QardsStorage(qards)
      const uploadResult = await storage.upload(
        this.image,
        Date.now().toString()
      );
      const imageUrl = await storage.getImageUrl(uploadResult.metadata.name)
      console.log(imageUrl);
      const card = {
        comments: [],
        creatorId: this.session.uid$.value!,
        holderHistory: [],
        holderId: null,
        imageId,
        imageUrl,
        location: {
          lat: 10,
          lng: 48
        },
        score: 9000 + 1,
        tags: [],
        title: this.title
      };
      await this.database.createCard(card);
      await this.viewCtrl.dismiss();
      this.modalCtrl.create(ShowcasePage, { card }).present();
    } catch (error) {
      console.log(error);
    } finally {
      loading.dismiss();
    }
  }
}
