import { AddcardPage } from './../addcard/addcard';
import { LoadingController } from 'ionic-angular';
import { GeneralService } from './../../providers/general-service/GeneralService';
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Printer, PrintOptions } from '@ionic-native/printer';

/**
 * Generated class for the CardaddedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-cardadded',
  templateUrl: 'cardadded.html',
})
export class CardaddedPage {
  aGetGiftCardByCoupon: any;
  category:any;

   username: string;
   password: string;

  dataFromAddCardSerialPage: any= [];
  couponCode:any;


  constructor(public printer: Printer,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public generalService:GeneralService) {
    // CardaddedPage.username="kadeel@apptech.com.tr";
    debugger;

    // CardaddedPage.password="store";
    this.dataFromAddCardSerialPage = this.navParams.get('dataFromAddCardSerialPage');
    this.dataFromAddCardSerialPage = this.dataFromAddCardSerialPage.aGetGiftCardByCoupon;

    this.couponCode= this.dataFromAddCardSerialPage.aGetGiftCardByCoupon;
    this.ApplyGiftCard(AddcardPage.username,AddcardPage.password,this.couponCode);



   console.log()
 }

 ApplyGiftCard(username,password,couponCode){

  let loader = this.loadingCtrl.create({
    content: "Verifying Coupon..."
});
loader.present();

  let requestCategory = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> <Body> <ApplyGiftCard xmlns="http://tempuri.org/"> <usernameOrEmail>'+username+'</usernameOrEmail> <userPassword>'+password+'</userPassword> <giftcardcouponcode>'+couponCode+'</giftcardcouponcode> </ApplyGiftCard> </Body> </Envelope>';
  let methodCategory = 'ApplyGiftCard';
  debugger;

  this.generalService.webService(requestCategory,methodCategory).then(response => {

    this.category = response;

    this.aGetGiftCardByCoupon = this.category.statusText;
    console.log(this.aGetGiftCardByCoupon);
    debugger;
    if(this.aGetGiftCardByCoupon=="OK"){

    this.category = JSON.parse(this.category._body);
    console.log(this.category);


    debugger;


    //   let alert = this.alertCtrl.create({
    //   title:this.aWebServiceAddWallet.aProduct.aProducts.aName+" activated",
    //   buttons:['OK']
    // });
    // alert.present();



    // this.navCtrl.push(AddcardsuccessPage);

    loader.dismiss();
  }
    else {

    }

  }, error => {

      loader.dismiss();

      return false;
  });

}


 ionViewDidLoad() {
   console.log('ionViewDidLoad AddcardsuccessPage');

 }
 removezero(item) {
  let itemToConvert =  item.aAmount.toString();
  let newValue = itemToConvert.split('.')[0];
  return newValue;
  }
  printPage(){

    this.printer.isAvailable().then();

let options: PrintOptions = {
     name: 'MyDocument',
     printerId: 'printer007',
     duplex: true,
     landscape: true,
     grayscale: true
   };

   this.printer.print("https://bahjahcards.com/",options).then();



// this.printer.isAvailable().then(function(){
//           this.printer.print("https://www.techiediaries.com").then(function(){
//           alert("printing done successfully !");
//           },function(){
//           alert("Error while printing !");
//           });
//         }, function(){
//         alert('Error : printing is unavailable on your device ');
//         });

          }

}
