import { RegistrationtwoPage } from './../registrationtwo/registrationtwo';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  public firstname;
  public lastname;
   removeEmptySpacesPattern = /^[a-zA-Z0-9]*$/i;

  formgroup: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  allFieldsRequiredText:any ="*All fields are required'";
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,public alertCtrl:AlertController,public formbuilder: FormBuilder) {
    this.formgroup = formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(4),Validators.pattern(this.removeEmptySpacesPattern)]],
      password: ['', [Validators.required, Validators.minLength(4)]]



    });

    this.username = this.formgroup.controls['username'];

    this.password = this.formgroup.controls['password'];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }
  openRegistration2() {

    if (this.formgroup.valid) {
      console.log(this.firstname, this.lastname);

      this.navCtrl.push(RegistrationtwoPage, { firstname: this.firstname, lastname: this.lastname });
    }
    else
    {
      let alert = this.alertCtrl.create({
        title:this.allFieldsRequiredText,
        buttons:['OK']
      });
      alert.present();
    }


  }

  openLogin(){

    // this.navCtrl.setRoot(LoginPage);
  }


}
