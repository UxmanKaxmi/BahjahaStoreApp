import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams,Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {

    this.storage.ready().then(() => {
      storage.clear();
      this.storage.set('page','TutorialPage');
    });
  }

  ionViewDidLoad() {



  }
  slideChangedto1(){
  setTimeout(() => this.slides.slideTo(1,1000),2000);

}
slideChangedto2(){

setTimeout(() => this.slides.slideTo(2,1000),2000);

}
  openHomePage(){

    // this.navCtrl.push(HomePage);
  }
  openMainThree(){
    // this.navCtrl.push(MainthreePage);


  }
  openLoginScreen(){
    // this.navCtrl.push(LoginPage);


  }



/*   setMyStyles() {
    let swiper= {
    };
    return swiper
  } */
}
