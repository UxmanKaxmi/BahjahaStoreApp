import { PrintPage } from './../pages/print/print';
import { LoginPage } from './../pages/login/login';
import { WalletselectedcardPage } from './../pages/walletselectedcard/walletselectedcard';
import { AddcardserialPage } from './../pages/addcardserial/addcardserial';
import { AddcardPage } from './../pages/addcard/addcard';
import { CardaddedPage } from './../pages/cardadded/cardadded';
import { WalletPage } from './../pages/wallet/wallet';
import { NetworkInterface } from '@ionic-native/network-interface';


import { RegistrationtwoPage } from './../pages/registrationtwo/registrationtwo';
import { RegistrationPage } from './../pages/registration/registration';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,enableProdMode  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { MyApp } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { SelectedcardPage } from '../pages/selectedcard/selectedcard';
import { GeneralService } from '../providers/general-service/GeneralService';
import { SendtofriendPage } from '../pages/sendtofriend/sendtofriend';
import { SendtowalletPage } from '../pages/sendtowallet/sendtowallet';
import { IonicStorageModule } from '@ionic/storage';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddcardsuccessPage } from '../pages/addcardsuccess/addcardsuccess';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { QrmodalPage } from '../pages/qrmodal/qrmodal';
import {ThemeableBrowser} from '@ionic-native/themeable-browser'
import { Printer, PrintOptions } from '@ionic-native/printer';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}




@NgModule({

  declarations: [
    PrintPage,QrmodalPage,AddcardsuccessPage,WalletselectedcardPage,MyApp,CardaddedPage,AddcardPage,AddcardserialPage,WalletPage,SendtowalletPage,TutorialPage,RegistrationPage,SendtofriendPage,SendtowalletPage,
    RegistrationtwoPage,SelectedcardPage,LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,NgxQRCodeModule,
    HttpClientModule,
    TranslateModule.forRoot({loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] }}),
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot({
      name: '__bdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']

    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PrintPage,QrmodalPage,AddcardsuccessPage,WalletselectedcardPage,CardaddedPage,AddcardPage,AddcardserialPage,MyApp,SendtowalletPage,TutorialPage,RegistrationPage,SendtofriendPage,SendtowalletPage,
    RegistrationtwoPage,SelectedcardPage,LoginPage
  ],
  providers: [

    InAppBrowser,SocialSharing,NetworkInterface,ThemeableBrowser,NativePageTransitions,Printer,
    StatusBar,QRScanner,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeneralService
  ]

}


)
export class AppModule {}
enableProdMode();
