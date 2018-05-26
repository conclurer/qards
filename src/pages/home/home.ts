import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubmitPage } from '../submit/submit';
import { ShowcasePage } from '../showcase/showcase';
import { Card, mockedCard } from '../../data/qard';
import { Camera, PictureSourceType } from '@ionic-native/camera';
import { QardsDatabase } from 'qards-lib';
import { SessionService } from '../../data/session';
import firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public collection: Card[] | null = null;

  constructor(
    public navCtrl: NavController,
    private readonly modalCtrl: ModalController,
    private readonly camera: Camera,
    private readonly database: QardsDatabase,
    private readonly session: SessionService,
    private readonly changeDetection: ChangeDetectorRef
  ) { }

  ionViewWillEnter() {
    this.database.getOwnCards(this.session.uid$.value)
      .then((cards: firebase.firestore.QuerySnapshot) => {
        this.collection = cards.docs.map(doc => ({ id: doc.id, ...doc.data() } as any as Card))
        this.changeDetection.markForCheck();
      })
  }

  async createCard() {
    try {
      const image = await this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: PictureSourceType.CAMERA,
        allowEdit: false,
        correctOrientation: true
      });
      this.modalCtrl.create(SubmitPage, { image, didLeave: () => this.ionViewWillEnter() }).present();
    } catch (error) {
      this.modalCtrl.create(SubmitPage, { didLeave: () => this.ionViewWillEnter()}).present();
    }
  }

  showCard(card: Card) {
    this.modalCtrl.create(ShowcasePage, { card, didLeave: () => this.ionViewWillEnter() }).present();
  }
}
