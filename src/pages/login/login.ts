import { GeneralService } from './../../providers/general-service/GeneralService';
import { RegistrationPage } from './../registration/registration';
//import { MainfourPage } from './../mainfour/mainfour';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
//import { MainthreePage } from '../mainthree/mainthree';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms'
import { AddcardPage } from '../addcard/addcard';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formgroup:FormGroup;
  username:AbstractControl;
  password:AbstractControl;


  method : string = "";
  request : string = "";
  dataList : any = "";
  myVariable: string;



  constructor(public navCtrl: NavController, public navParams: NavParams,    public modalCtrl : ModalController, public generalService: GeneralService,public loadingCtrl: LoadingController,public alertCtrl:AlertController,
    public formbuilder: FormBuilder, public toastCtrl: ToastController, public translate: TranslateService, private storage: Storage) {

      this.storage.ready().then(() => {
        // this.storage.clear();
        this.storage.remove('page');
        this.storage.remove('usr');
        this.storage.remove('pwd');

        this.storage.set('page','LoginPage');
        console.log("First time so show modal")
      });

      let EMAILPATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i;


        this.formgroup = formbuilder.group({
          username:['',[Validators.required, Validators.pattern(EMAILPATTERN)]],
          password:['',Validators.required]


        });

        this.username = this.formgroup.controls['username'];
        this.password = this.formgroup.controls['password'];


  }
  english(){
    this.translate.use('en'); // Set your language here
    console.log('cover to english');

  }



arabic(){
  this.translate.use('ar'); // Set your language here
  console.log('cover to arabic');

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }
  openRegistration(){
    this.navCtrl.push(RegistrationPage);



  }


  openHomePage(){


    if (this.formgroup.valid) {
      // debugger;

     //assigning values of method for the request
     this.method = "Login";
     // assigning values of signup form to request soap
     this.request ="<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\">"+
      "<soapenv:Header/>"+
      "<soapenv:Body>"+
      "<tem:Login>"+
      "<tem:usernameOrEmail>"+

      this.username.value+

      "</tem:usernameOrEmail>"+
      "<tem:userPassword>"+


      this.password.value+

      "</tem:userPassword>"+
      "<tem:guestToken></tem:guestToken>"+
   "</tem:Login>"+



      "</soapenv:Body>"+
     "</soapenv:Envelope>";



 // Opening a Loader when pressing Button
     let loader = this.loadingCtrl.create({
       content: "Logging in..."
     });
     loader.present();




     this.generalService.webService(this.request,this.method)
     .then(response => {
         this.dataList = response;
         this.dataList = JSON.parse(this.dataList._body);
         loader.dismiss(); // disabling Loader as soon as the response is fed

         // checking for success or failure
         let alertTitle : string = "";

         //FOR CUSTOMER DOESNT EXIST ERROR
         if (this.dataList.aStatus == "CustomerNotExist") {

           this.translate.get("ERROR: Customer does not exist").subscribe(value => {
              alertTitle = value
           });
           let toast = this.toastCtrl.create({
               //assigning the success message to toast only
               message: alertTitle,

               cssClass: 'mytoast',
               duration: 3500
           });

           toast.present(toast);
         }

         //FOR Wrong Password ERROR

           if (this.dataList.aStatus == "WrongPassword") {

          this.translate.get("Wrong Password").subscribe(value => {
             alertTitle = value
          });
          let toast2= this.toastCtrl.create({
              //assigning the success message to toast only
              message: alertTitle,
              cssClass: 'mytoast',
              duration: 1500
          });

          toast2.present(toast2);
        }



          if (this.dataList.aStatus == "Success") {


            this.storage.ready().then(() => {
              this.storage.set('usr', this.username.value);
              this.storage.set('pwd',this.password.value);
              this.storage.set('page','TabsPage');
            });


          this.translate.get("Logged in Successfully").subscribe(value => {
             alertTitle = value
          });
          let toast = this.toastCtrl.create({
              //assigning the success message to toast only
              message: alertTitle,
              cssClass: 'mytoast',
              duration: 1500
          });

          toast.present(toast);

          setTimeout( () => {
            this.navCtrl.setRoot(AddcardPage);

          }, 1000);


        }

    });
     }
     else  //for Shwoing Alert if Fields are empty
     {
       let alert = this.alertCtrl.create({
         title:'*All fields are required',
         buttons:['OK']
       });
       alert.present();
     }





  }
  // openResetPassword(){

  //   this.navCtrl.push(ResetpasswordPage);


  // }

}
