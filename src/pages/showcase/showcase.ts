import { Component, ChangeDetectorRef } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Card } from '../../data/qard';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

@Component({
  templateUrl: 'showcase.html'
})
export class ShowcasePage {
  public card: Card;
  public location: string;

  constructor(
    private readonly viewCtrl: ViewController,
    private readonly geocoder: NativeGeocoder,
    private readonly changeDetection: ChangeDetectorRef,
    navParams: NavParams
  ) {
    this.card = navParams.get('card');
    this.geocoder.reverseGeocode(this.card.location._lat, this.card.location._long)
      .then(results => {
        const result = results[0];
        if (result) {
          this.location = `${result.locality}, ${result.countryCode}`
          this.changeDetection.markForCheck()
        }
      }).catch(() => this.location = 'Ähh lol und ähh fickt euch')
  }

  throwAway() {}

  keep() {
    this.viewCtrl.dismiss();
  }
}
