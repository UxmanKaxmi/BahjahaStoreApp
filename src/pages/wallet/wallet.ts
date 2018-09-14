import { QrmodalPage } from './../qrmodal/qrmodal';
import { WalletselectedcardPage } from './../walletselectedcard/walletselectedcard';
// import { LoginPage } from './../login/login';
import { Storage } from '@ionic/storage';
import { GeneralService } from './../../providers/general-service/GeneralService';
import { AddcardPage } from './../addcard/addcard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController,ModalController  } from 'ionic-angular';
import { RequestMethod } from '../../../node_modules/@angular/http';
/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  username: any = "";
  password: any = "";
  data:any = [];
  loadingText : string = "loading data...";
  test: any;
  dataFromGetProductDetails: any=[];
  aImageUrl:any=[];
  productId:any=[];
  WalletCore: any=[];
  addressIsEmpty: boolean = false;
  UrlPicture: any;
  constructor(public modalCtrl : ModalController,public storage:Storage,public navCtrl: NavController, public navParams: NavParams, public generalService:GeneralService,public loader:LoadingController,public alertCtrl: AlertController,public toastCtrl:ToastController) {


    this.storage.get("usr").then((usr) => {
      this.username= usr;
    });

    this.storage.get('pwd').then((pwd) => {
        this.password = pwd;
    });

    setTimeout( () => {
      if (this.username != "" && this.username != null && this.password != "" && this.password != null ) {
        this.getCustWalletSevice(this.username,this.password);

      } else {
        // this.navCtrl.setRoot(LoginPage);

      }
    }, 500);
  }


  getCustWalletSevice(username,password){

    let loader = this.loader.create({
      content: this.loadingText
    });
    loader.present();

    let requestCategory = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> <Body> <GetCustomerWallet xmlns="http://tempuri.org/"> <usernameOrEmail>'+username+'</usernameOrEmail> <userPassword>'+password+'</userPassword> </GetCustomerWallet> </Body> </Envelope>';
    let methodCategory = 'GetCustomerWallet';

    this.generalService.webService(requestCategory,methodCategory).then(response => {

      this.data = response;

      this.data = JSON.parse(this.data._body);


debugger;
      if (this.data.aWebServiceWallet) {
        this.WalletCore= this.data.aWebServiceWallet;
      } else {
        this.addressIsEmpty = true;
      }


      loader.dismiss();

      // this.UrlPicture=this.WalletCore.UrlPicture;

      //loop for calling prodductDetailService inside each index

      // for(var i in this.WalletCore){
      //   console.log(this.WalletCore[i]);//This will print the objects
        //This will print the index of the objects
        // this.productId= this.WalletCore[i].aProductId;

        // setTimeout( () => {

            // this.GetProductDetails(this.username,this.password,this.productId);


        // }, 1000);


     // this.productId =this.data.aWalletCore.aProductId;








    },error => {

      loader.dismiss();
      let alert = this.alertCtrl.create({
        title:'Error: Connecting to the network',
        buttons:['OK']
      });
      alert.present();

      return false;
    }

    )





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

  public GetProductDetails (username,password,productId) {
    let requestDetail = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> <soapenv:Header/> <soapenv:Body> <tem:GetProductDetails> <tem:usernameOrEmail>'+username+'</tem:usernameOrEmail> <tem:userPassword>'+password+'</tem:userPassword> <tem:productId>'+productId+'</tem:productId> </tem:GetProductDetails> </soapenv:Body> </soapenv:Envelope>';
    let methodDetail = 'GetProductDetails';


    let loader = this.loader.create({
      content: this.loadingText
    });
    loader.present();
    this.generalService.webService(requestDetail,methodDetail).then(response => {
    this.dataFromGetProductDetails = response;
    this.dataFromGetProductDetails = JSON.parse(this.dataFromGetProductDetails._body);
    console.log(this.dataFromGetProductDetails);
      debugger;

    loader.dismiss();



  }, error =>{
      alert("No internet connection");
  });

}
  addWallet(){
    this.navCtrl.setRoot(AddcardPage);
  }
  generateQRCode(event,item){
    let modal = this.modalCtrl.create(QrmodalPage, {data: item});
    debugger;
    modal.present();
      }






  }


