import { Component } from '@angular/core';
import { ViewController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { ShowcasePage } from '../showcase/showcase';
import { mockedCard } from '../../data/qard';
import { QardsDatabase, QardsStorage } from 'qards-lib';
import { SessionService } from '../../data/session';
//import { Geolocation } from '@ionic-native/geolocation';
import firebase from 'firebase'

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
    private readonly storage: QardsStorage,
    //private readonly geolocation: Geolocation,
    navParams: NavParams
  ) {
    this.image = navParams.get('image') || null;
    this.geolocation
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
      const uploadResult = await this.storage.upload(
        this.image,
        Date.now().toString()
      );
      //const loaction = await this.geolocation.getCurrentPosition();
      const imageUrl = await this.storage.getImageUrl(uploadResult.metadata.name)
      const uploadCard = {
        comments: [],
        creatorId: this.session.uid$.value!,
        holderHistory: [],
        holderId: null,
        imageId,
        imageUrl,
        location: {
          _lat: 10,
          _long: 48
        },
        score: 9000 + 1,
        tags: [],
        title: this.title
      };
      await this.database.createCard(uploadCard);
      await this.viewCtrl.dismiss();
      const result = await this.database.getRandomCard()
      console.log(result)
      const card = result.docs[0].data()
      this.modalCtrl.create(ShowcasePage, { card }).present();
    } catch (error) {
      console.log(error);
    } finally {
      loading.dismiss();
    }
  }
}
