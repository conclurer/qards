import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  templateUrl: 'submit.html'
})
export class SubmitPage {
  constructor(private readonly viewCtrl: ViewController) { }

  abort() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.viewCtrl.dismiss();
  }
}
