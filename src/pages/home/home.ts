import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubmitPage } from '../submit/submit';
import { ShowcasePage } from '../showcase/showcase';
import { Card, mockedCard } from '../../data/qard';
import { Camera, PictureSourceType } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public collection: Card[] = [
    mockedCard('Ghoast', 277),
    mockedCard('Recep', 5),
    mockedCard('Goathic', 99)
  ];

  constructor(
    public navCtrl: NavController,
    private readonly modalCtrl: ModalController,
    private readonly camera: Camera
  ) {}

  async createCard() {
    try {
      const imageData = this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: PictureSourceType.CAMERA,
        allowEdit: false,
        correctOrientation: true
      });
      const image = 'data:image/jpeg;base64,' + imageData;
      this.modalCtrl.create(SubmitPage, { image }).present();
    } catch (error) {
      this.modalCtrl.create(SubmitPage).present();
    }
  }

  showCard(card: Card) {
    this.modalCtrl.create(ShowcasePage, { card }).present();
  }
}
