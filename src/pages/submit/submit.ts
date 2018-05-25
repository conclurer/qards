import { Component } from "@angular/core";
import { ViewController, ModalController } from "ionic-angular";
import { ShowcasePage } from "../showcase/showcase";

@Component({
  templateUrl: 'submit.html'
})
export class SubmitPage {
  constructor(private readonly viewCtrl: ViewController, private readonly modalCtrl: ModalController) { }

  abort() {
    this.viewCtrl.dismiss();
  }

  async submit() {
    await this.viewCtrl.dismiss();
    this.modalCtrl.create(ShowcasePage).present()
  }
}
