import { Component, ChangeDetectorRef } from '@angular/core';
import { ViewController, NavParams, LoadingController } from 'ionic-angular';
import { Card } from '../../data/qard';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { QardsDatabase } from 'qards-lib';
import { SessionService } from '../../data/session';

@Component({
  templateUrl: 'showcase.html'
})
export class ShowcasePage {
  public card: Card & { id: string };
  public location: string;
  private readonly didLeave: () => void;
  constructor(
    private readonly viewCtrl: ViewController,
    private readonly geocoder: NativeGeocoder,
    private readonly changeDetection: ChangeDetectorRef,
    private readonly loading: LoadingController,
    private readonly database: QardsDatabase,
    private readonly session: SessionService,
    navParams: NavParams
  ) {
    this.card = navParams.get('card');
    this.didLeave = navParams.get('didLeave') || (() => void 0);
    this.geocoder.reverseGeocode(this.card.location._lat, this.card.location._long)
      .then(results => {
        const result = results[0];
        if (result) {
          this.location = `${result.locality}, ${result.countryCode}`
          this.changeDetection.markForCheck()
        }
      }).catch(() => this.location = '')
  }

  async throwAway() {
    const loading = this.loading.create()
    loading.present()
    const oldCard = this.card;
    this.card = null;
    this.changeDetection.markForCheck();
    await this.database.discardCard(oldCard.id)
    const newRandom = await this.database.getRandomCard()
    this.card = { id: newRandom.id, ...(newRandom.data() as Card) }
    this.changeDetection.markForCheck();
    loading.dismiss()
    this.didLeave()
  }

  async keep() {
    await this.database.storeCard(this.card.id, this.session.uid$.value)
    this.viewCtrl.dismiss();
    this.didLeave()
  }
}
