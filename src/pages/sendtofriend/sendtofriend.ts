import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SendtofriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sendtofriend',
  templateUrl: 'sendtofriend.html',
})
export class SendtofriendPage {
  dataFromPaypage: any= [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataFromPaypage = navParams.get("item");
    console.log("dataFromPaypage",this.dataFromPaypage);
    debugger;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendtofriendPage');
  }

}
