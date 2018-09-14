import { SelectedcardPage } from './../selectedcard/selectedcard';
import { AddcardsuccessPage } from './../addcardsuccess/addcardsuccess';
import { WalletPage } from './../wallet/wallet';
import { GeneralService } from './../../providers/general-service/GeneralService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { empty } from '../../../node_modules/rxjs/Observer';
import { AddcardPage } from '../addcard/addcard';

/**
 * Generated class for the AddcardserialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addcardserial',
  templateUrl: 'addcardserial.html',
})
export class AddcardserialPage {
  couponCode: string= "";
  password: string= "";
  username: string= "";
  category: any= [];
  aWebServiceAddWallet: any;
  statusText: string;
  cardNotVerifiedText:any="card not verified!";
  fieldEmptyText="*Field cannot be empty"
  qrcode: any;
  aGetGiftCardByCoupon: any;
  constructor(public alertCtrl:AlertController,private storage:Storage,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public generalService:GeneralService) {

    this.qrcode= navParams.get('qrcodeFromPreviousPage');
    this.couponCode=this.qrcode;
    this.username=AddcardPage.username;
    this.password=AddcardPage.password;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcardserialPage');
  }
  // AddToWalletByCouponCodeButton(){
  //   if(this.couponCode==""){

  //     let alert = this.alertCtrl.create({
  //       title:this.fieldEmptyText,
  //       buttons:['OK']
  //     });
  //     alert.present();
  //   }
  //   else {
  //     this.AddToWalletByCouponCodeService(this.username,this.password,this.couponCode);

  //   }

  // }

  // AddToWalletByCouponCodeService(username,password,couponCode){

  //   let loader = this.loadingCtrl.create({
  //     content: "Verifying Coupon..."
  // });
  // loader.present();

  //   let requestCategory = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> <Body> <ApplyGiftCard xmlns="http://tempuri.org/"> <usernameOrEmail>'+username+'</usernameOrEmail> <userPassword>'+password+'</userPassword> <giftcardcouponcode>'+couponCode+'</giftcardcouponcode> </ApplyGiftCard> </Body> </Envelope>';
  //   let methodCategory = 'ApplyGiftCard';

  //   this.generalService.webService(requestCategory,methodCategory).then(response => {

  //     this.category = response;
  //       debugger;
  //     this.statusText = this.category.statusText;
  //     console.log(this.statusText);

  //     if(this.statusText=="OK"){

  //     this.category = JSON.parse(this.category._body);

  //       let alert = this.alertCtrl.create({
  //       title:this.category.aMessage,
  //       buttons:['OK']
  //     });
  //     alert.present();
  //     if(this.qrcode!=empty){


  //     }
  //     else{

  //     }

  //     this.navCtrl.push(AddcardsuccessPage, {item: this.aWebServiceAddWallet});



  //     // this.navCtrl.push(AddcardsuccessPage);

  //     console.log(this.aWebServiceAddWallet);
  //     loader.dismiss();}
  //     else {

  //     }

  //   }, error => {

  //       loader.dismiss();
  //       let alert = this.alertCtrl.create({
  //         title:this.cardNotVerifiedText,
  //         buttons:['OK']
  //       });
  //       alert.present();
  //       return false;
  //   });

  // }



  GetGiftCardByCoupon(username,password,couponCode){

    let loader = this.loadingCtrl.create({
      content: "Verifying Coupon..."
  });
  loader.present();

  let requestCategory = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> <Body> <GetGiftCardByCoupon xmlns="http://tempuri.org/"> <usernameOrEmail>'+username+'</usernameOrEmail> <userPassword>'+password+'</userPassword> <coupon>'+couponCode+'</coupon> </GetGiftCardByCoupon> </Body> </Envelope>';
  let methodCategory = 'GetGiftCardByCoupon';
    debugger;

    this.generalService.webService(requestCategory,methodCategory).then(response => {

      this.category = response;

      this.aGetGiftCardByCoupon = this.category.statusText;
      console.log(this.aGetGiftCardByCoupon);

      if(this.aGetGiftCardByCoupon=="OK"){

      this.category = JSON.parse(this.category._body);
      console.log(this.category);


      debugger;


      //   let alert = this.alertCtrl.create({
      //   title:this.aWebServiceAddWallet.aProduct.aProducts.aName+" activated",
      //   buttons:['OK']
      // });
      // alert.present();

      this.navCtrl.setRoot(AddcardsuccessPage, {
        dataFromAddCardSerialPage: this.category
      });



      // this.navCtrl.push(AddcardsuccessPage);

      console.log(this.aWebServiceAddWallet);
      loader.dismiss();
    }
      else {

      }

    }, error => {

        loader.dismiss();
        let alert = this.alertCtrl.create({
          title:this.cardNotVerifiedText,
          buttons:['OK']
        });
        alert.present();
        return false;
    });

  }





}
