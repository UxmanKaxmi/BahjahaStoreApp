import { CardaddedPage } from './../cardadded/cardadded';
import { GeneralService } from './../../providers/general-service/GeneralService';
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddcardsuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addcardsuccess',
  templateUrl: 'addcardsuccess.html',
})
export class AddcardsuccessPage {
  dataFromAddCardSerialPage: any;
  IsGiftCardUsed:boolean=false ;
  // Is: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,public generalService:GeneralService) {
     this.dataFromAddCardSerialPage = this.navParams.get('dataFromAddCardSerialPage');


     debugger;

     //for hiding the redeem buttom if the gift card is used
    if(this.dataFromAddCardSerialPage.aGetGiftCardByCoupon.aIsGiftCardUsed == "false"){

      this.IsGiftCardUsed=false ;


    }
    else
    {
      this.IsGiftCardUsed=true ;

    }


    console.log()
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AddcardsuccessPage');
  }
  redeem(){

    this.navCtrl.push(CardaddedPage, {
      dataFromAddCardSerialPage: this.dataFromAddCardSerialPage
    });
  }



}
