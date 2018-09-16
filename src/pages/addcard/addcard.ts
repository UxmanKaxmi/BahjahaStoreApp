import { Printer, PrintOptions } from '@ionic-native/printer';
import { Storage } from '@ionic/storage';
import { GeneralService } from './../../providers/general-service/GeneralService';
import { ToastController, Platform } from "ionic-angular";
import { AddcardserialPage } from "./../addcardserial/addcardserial";
import { Component } from "@angular/core";
import {  NavController, NavParams,LoadingController,AlertController } from "ionic-angular";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";
import {
  NativePageTransitions,
  NativeTransitionOptions
} from "@ionic-native/native-page-transitions";
import { AddcardsuccessPage } from '../addcardsuccess/addcardsuccess';
/**
 * Generated class for the AddcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-addcard",
  templateUrl: "addcard.html"
})
export class AddcardPage {
  public text: any;
  qrcode: any;
  category: any= [];
  aGetGiftCardByCoupon: any;
  aWebServiceAddWallet: any=[];
  cardNotVerifiedText: string="Card not verified";
  static username: string;
  static password: string;
  unregisterBackButtonAction: any;


  constructor(
   public loadingCtrl:LoadingController,public generalService:GeneralService,public alertCtrl:AlertController,
    public nativePageTransitions: NativePageTransitions,
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    public toastCtrl: ToastController,
    public storage:Storage,
    public printer:Printer
  ) {
    this.storage.get("usr").then((usr) => {
      AddcardPage.username= usr;
    });

    this.storage.get('pwd').then((pwd) => {
      AddcardPage.password = pwd;
    });


  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddcardPage");
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
}


ionViewDidEnter() {
  this.initializeBackButtonCustomHandler();
}
public initializeBackButtonCustomHandler(): void {
  this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      this.customHandleBackButton();
  }, 10);
}
private customHandleBackButton(): void {
  window.document.querySelector("body").classList.remove("transparent-body");
  // window.document.querySelector("ion-app").classList("transparent-body");

}

  scanSerial() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {


        if (status.authorized) {



          // this.platform.registerBackButtonAction(() => {
          // });


          let scanSub = this.qrScanner.scan().subscribe(text => {
            console.log("Scanned something", text);
            this.qrcode = text;
            // this.AddToWalletByCouponCodeService(this.username,this.password,this.qrcode);

            this.qrScanner.destroy(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning

            this.GetGiftCardByCoupon(AddcardPage.username,AddcardPage.password,this.qrcode);
            window.document.querySelector("body").classList.remove("transparent-body");
            // window.document.querySelector("ion-app").classList("transparent-body");

            // let toast = this.toastCtrl.create({

            //   //assigning the success message to toast only
            //   message: text,
            //   duration: 1500
            // });
            // toast.present(toast);

          });
          window.document.querySelector("body").classList.add("transparent-body");

          this.qrScanner.show();
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log("Error is", e));
  }
  public addSerial() {
    // let options: NativeTransitionOptions = {
    //   direction: "left",
    //   duration: 400,
    //   slowdownfactor: -1,
    //   iosdelay: 50,
    //   androiddelay: 50
    // };
    // this.nativePageTransitions.slide(options);
    // this.navCtrl.push(AddcardserialPage, {qrcodeFromPreviousPage: this.qrcode});
    this.navCtrl.push(AddcardserialPage)
  }


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
