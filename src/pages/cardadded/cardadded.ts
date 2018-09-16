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
     duplex: false,
     landscape: false,
     grayscale: true
    //  bounds:[4000,500]
   };

   this.printer.print('<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"></head><body style=" "><div id="invoice-POS" style=" padding: 32px; "> <center id="top"> <div class="logo"></div> <div class="info"> <h2 style=" font-size: 50px; ">Bahjah</h2> </div><!--End Info--> </center><!--End InvoiceTop--> <div class="info"> <h2 style="font-size: 38px;text-align: center;">Receipt</h2> <br><br><br></div> <div id="bot" style=" /* align-self: center; */ /* justify-content: center; */ "> <div id="table" style=" text-align: -webkit-center; "> <table style=" width: 100%; "> <tbody><tr class="tabletitle"> <td class="item" style=" "><h2 style="font-size: 40px;">Card Name</h2></td> <td class="Hours"><h2 style=" font-size: 40px; ">Qty</h2></td> <td class="Rate"><h2 style=" font-size: 40px; ">Price</h2></td> </tr> <tr class="service"> <td class="tableitem"><p class="itemtext" style=" font-size: 35px; /* font-size: 40px; */ ">'+this.dataFromAddCardSerialPage.aProduct
.aProducts.aName+'</p></td> <td class="tableitem"><p class="itemtext" style=" font-size: 35px; /* font-size: 40px; */ ">1</p></td> <td class="tableitem"><p class="itemtext" style=" font-size: 35px; ">'+this.dataFromAddCardSerialPage.aAmount+'</p></td> </tr> <br></tbody><br></table> <br><br></div> <br><br><br> <!--End Table--> <div id="bot" style=" text-align: -webkit-center; "> <div id="table"> <table style=" width: 100%; "> <tbody><tr class="tabletitle"> <td class="item"><h2 style=" font-size: 40px; ">Recipient Email</h2></td> <td class="Rate"><h2 style=" font-size: 40px; ">Sender Email</h2></td> </tr> <tr class="service"> <td class="tableitem"><p class="itemtext" style=" font-size: 35px; ">'+this.dataFromAddCardSerialPage.aRecipientName
+'</p></td> <td class="tableitem"><p class="itemtext" style=" font-size: 35px; ">'+this.dataFromAddCardSerialPage.aSenderEmail
+'</p></td> </tr> </tbody></table> <br></div><!--End Table--> <div id="legalcopy" style=" font-size: 63px; "> <p class="legal"><strong>Thank you for your business!</strong> </p> </div> <br></div><!--End InvoiceBot--> </div><!--End Invoice--></div></body></html>',options).then();
   debugger;



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
