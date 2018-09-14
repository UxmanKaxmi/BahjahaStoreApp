import { LoginPage } from './../pages/login/login';
import { SelectedcardPage } from './../pages/selectedcard/selectedcard';
import { AddcardPage } from './../pages/addcard/addcard';

import { WalletPage } from './../pages/wallet/wallet';
import { TutorialPage } from './../pages/tutorial/tutorial';


import { TranslateService } from '@ngx-translate/core';

import { Component } from '@angular/core';
import { Platform, Tabs, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { AddcardserialPage } from '../pages/addcardserial/addcardserial';
import { AddcardsuccessPage } from '../pages/addcardsuccess/addcardsuccess';

@Component({

  templateUrl: 'app.html'

})

export class MyApp {



  rootPage:any = "";

  constructor(private platform: Platform,private translate: TranslateService,  statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      statusBar.hide();
      splashScreen.hide();



      debugger;

          storage.get('page').then((value) => {
            if (value == "TabsPage") {
              this.rootPage = AddcardPage;
            }
            else {
              this.rootPage = LoginPage;
            }

          });


    });
    this.initTranslate();

  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'en') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-en|CHS|Hans/i)) {
          this.translate.use('ar');
        } else if (browserCultureLang.match(/-en|CHT|Hant/i)) {
          this.translate.use('ar');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('ar'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
    });

  }




}


