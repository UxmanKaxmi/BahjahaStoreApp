import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { timeout } from 'rxjs/operator/timeout';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GeneralService } from "./../../providers/general-service/GeneralService";
import { LoadingController, Navbar } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TranslateService } from "../../../node_modules/@ngx-translate/core";


/**
 * Generated class for the SelectedcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-selectedcard",
  templateUrl: "selectedcard.html"
})
export class SelectedcardPage {
  cards: string;
  value: any;
  value2: any;
  tabBarElement: any;

  amount: any = 1;
  responseFromVendor: any = "";

  emailOfVendor: any = "";
  nameOfVendor: any = "";
  length:any;
  @ViewChild(Navbar) navBar: Navbar;
  dataList : any = "";
  img: any;
  data: any = [];
  product: any = [];
  attributeData: any = [];
  addClassName: string = "";
  category: any = [];
  aDefaultPictureModel: any;
   static productId: any;
   user: string=  "";
   password: string = "";
   priceAttr: any;
   vendorModel: any = [];
   wishListText: string = "Added to favourites";
   wishlistStatus: any = [];
  aId: any;
  addressOfVendor: any = [];
  addressIsEmpty: boolean =false;

  //productId:any;

  constructor(
    public nativePageTransitions:NativePageTransitions,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public generalService: GeneralService,
    private storage:Storage,
    private socialSharing: SocialSharing
  ) {

     //for removing tab in this page
     this.tabBarElement = document.querySelector('.tabbar.show-tabbar');


    // this.value2 = navParams.get("items");
    // SelectedcardPage.productId = this.value2.aId;

    this.cards = "About Card";


    this.value = navParams.get("productData");

    console.log(this.value);


    if(this.value.aId != null){
      SelectedcardPage.productId = this.value.aId;
      console.log("Product id form home page is",SelectedcardPage.productId);
    }

    else{
      SelectedcardPage.productId = this.value.aProductId;
      console.log("Product id form wishlist is",SelectedcardPage.productId);
    }


    console.log("THE RESPONSE FROM HOMEPAGE:", this.value);
    this.storage.keys().then((res) => {
      console.log(res);
    });
    // Opening a Loader for Loding data
    let loader = this.loadingCtrl.create({
        content: "Loading data..."
    });





    loader.present();
    this.storage.get('usr').then((usr) => {
      this.user = usr;
        this.storage.get('pwd').then((pwd) => {
          this.password = pwd;
            this.GetProductDetails(usr,pwd,loader);

        });
    });







    // console.log("The data from the previous page is", this.value)
  }


  public GetProductDetails (username,password,loader) {
      let requestDetail = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> <soapenv:Header/> <soapenv:Body> <tem:GetProductDetails> <tem:usernameOrEmail>'+username+'</tem:usernameOrEmail> <tem:userPassword>'+password+'</tem:userPassword> <tem:productId>'+SelectedcardPage.productId+'</tem:productId> </tem:GetProductDetails> </soapenv:Body> </soapenv:Envelope>';
      let methodDetail = 'GetProductDetails';
      this.generalService.webService(requestDetail,methodDetail).then(response => {

      this.dataList = response;
      this.dataList = JSON.parse(this.dataList._body);
      console.log(this.dataList);


      if (this.dataList) {
        if (this.dataList.aName.length > 0) {
          this.data = this.dataList;
          this.aDefaultPictureModel= this.data.aDefaultPictureModel;
          this.product.price = this.data.aProductPrice.aPriceValue;
          this.vendorModel = this.dataList.aVendorModel;
          this.aId= this.vendorModel.aId;
          console.log( "VendorModel ID IS: ",this.aId);

          this.vendorLocationRequest(this.user,this.password,loader,this.aId);



          // this.product.priceAttributes = this.data
          if (this.data.aProductAttributes["aWebServiceProductDetails.ProductAttributeModel"].length > 0) {
            for (let attributes of this.data.aProductAttributes["aWebServiceProductDetails.ProductAttributeModel"]) {
                if(attributes.aName == "Price") {
                  if (attributes.aValues["aWebServiceProductDetails.ProductAttributeValueModel"].length > 0) {
                    this.attributeData = attributes.aValues["aWebServiceProductDetails.ProductAttributeValueModel"];
                    this.priceAttr = this.attributeData[0].aId;
                    this.data.FinalPriceAttr = this.attributeData[0].aId;
                    this.data.FinalPrice = parseInt(this.product.price) + parseInt(this.attributeData[0].aPriceAdjustmentValue);
                  }
                }
            }
          } else {
              let attributes = this.data.aProductAttributes["aWebServiceProductDetails.ProductAttributeModel"];
              if(attributes.aName == "Price") {
                if (attributes.aValues["aWebServiceProductDetails.ProductAttributeValueModel"].length > 0) {
                  this.attributeData = attributes.aValues["aWebServiceProductDetails.ProductAttributeValueModel"];
                  this.priceAttr = this.attributeData[0].aId;
                }
              }
          }
        } else {
          this.data['0'] = this.dataList;
        }
      } else {
        this.data = null;
      }
    }, error =>{
        loader.dismiss();
        alert("No internet connection");
    });

  }


  private vendorLocationRequest (username,password,loader,aId) {


    let vendorLocationRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"> <soapenv:Header/> <soapenv:Body> <tem:GetVendor> <tem:usernameOrEmail>'+username+'</tem:usernameOrEmail> <tem:userPassword>'+password+'</tem:userPassword> <tem:vendorId>'+aId+'</tem:vendorId> </tem:GetVendor> </soapenv:Body> </soapenv:Envelope>';
    let vendorLocationMethod = 'GetVendor';
    this.generalService.webService(vendorLocationRequest,vendorLocationMethod).then(response => {

    this.responseFromVendor = response;

    if(this.responseFromVendor._body.length==2)
    {
     this.addressIsEmpty= true;
     loader.dismiss();


    }
    else{
    console.log("FirstResponse",this.responseFromVendor);

    this.responseFromVendor = JSON.parse(this.responseFromVendor._body);
    console.log("SecondResponse",this.responseFromVendor);
    this.nameOfVendor= this.responseFromVendor.aName;
    console.log("ThirdResponse",this.responseFromVendor);
    this.emailOfVendor = this.responseFromVendor.aEmail;
    this.addressOfVendor = this.responseFromVendor.aAddresses.aAddress;



    loader.dismiss();

    }

  }, error =>{
      loader.dismiss();
      alert("No internet connection");
  });

}

setBackButtonAction(){
  this.navBar.backButtonClick = () => {
     this.navCtrl.pop({animate:false})
  }
}






  ionViewDidLoad() {
    console.log("ionViewDidLoad SelectedcardPage");
    this.setBackButtonAction()

  }








  confirmPage(){
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50,
      androiddelay:50,


     };

    this.nativePageTransitions.slide(options);
    // this.navCtrl.push(BuycarddetailsPage,{item:this.data},{animate:false});
  }
  ionViewWillEnter() {
    let tabBarElement = document.querySelector('.tabbar.show-tabbar');
    if (tabBarElement != null) {
      this.tabBarElement.style.display = 'none'; // or whichever property which you want to access
    }
  }

  ionViewWillLeave() {
    let tabBarElement = document.querySelector('.tabbar.show-tabbar');
    if (tabBarElement != null) {
      this.tabBarElement.style.display = 'flex'; // or whichever property which you want to access
    }
  }


  addToWishList(event,data) {

    // Opening a Loader for Loding data
    let loader = this.loadingCtrl.create({
      content: "Loading data..."
    });

  loader.present();

    let CustomMessage = "Thank you! for adding this item to Wishlist";

    // this.translate.get("ERROR: Customer does not exist").subscribe(value => {

    // });
    let dynamicAttributes = '';
    let productQuantityAttr = '';


    if (data.aProductAttributes["aWebServiceProductDetails.ProductAttributeModel"].length > 0) {
      for (let attributes of data.aProductAttributes["aWebServiceProductDetails.ProductAttributeModel"]) {
          if(attributes.aName == "Price") {
            dynamicAttributes = '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
              '<Key>product_attribute_'+attributes.aId+'</Key>'+
              '<Value>'+this.priceAttr+'</Value>'+
            '</KeyValueOfstringstring>';

            productQuantityAttr = '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
                '<Key>product_attribute_'+attributes.aId+'_'+this.priceAttr+'_qty</Key>'+
                '<Value>1</Value>'+
            '</KeyValueOfstringstring>';

          } else {
            dynamicAttributes += '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
              '<Key>product_attribute_'+attributes.aId+'</Key>'+
              '<Value>'+CustomMessage+'</Value>'+
            '</KeyValueOfstringstring>';
          }
      }
    } else {
        let attributes = data.aProductAttributes["aWebServiceProductDetails.ProductAttributeModel"];
        if(attributes.aName == "Price") {
          dynamicAttributes = '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
            '<Key>product_attribute_'+attributes.aId+'</Key>'+
            '<Value>'+this.priceAttr+'</Value>'+
          '</KeyValueOfstringstring>';

          productQuantityAttr = '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
              '<Key>product_attribute_'+attributes.aId+'_'+this.priceAttr+'_qty</Key>'+
              '<Value>1</Value>'+
          '</KeyValueOfstringstring>';

        } else {
          dynamicAttributes += '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
            '<Key>product_attribute_'+attributes.aId+'</Key>'+
            '<Value>'+CustomMessage+'</Value>'+
          '</KeyValueOfstringstring>';
        }
    }


    let body = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><AddToWhishlist xmlns="http://tempuri.org/"><productId>'+data.aId+'</productId><quantity>1</quantity><usernameOrEmail>'+this.user+'</usernameOrEmail><userPassword>'+this.password+'</userPassword><inputValues>';
    body += dynamicAttributes;
    body +=     '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
                    '<Key>giftcard_'+data.aId+'.Message</Key>'+
                    '<Value>'+CustomMessage+'</Value>'+
                '</KeyValueOfstringstring>'+
                '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
                    '<Key>giftcard_'+data.aId+'.RecipientEmail</Key>'+
                    '<Value>'+data.aGiftCard.aSenderEmail+'</Value>'+
                '</KeyValueOfstringstring>'+
                '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
                    '<Key>giftcard_'+data.aId+'.RecipientName</Key>'+
                    '<Value>'+data.aGiftCard.aSenderName+'</Value>'+
                '</KeyValueOfstringstring>'+
                '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
                    '<Key>giftcard_'+data.aId+'.SenderEmail</Key>'+
                    '<Value>'+data.aGiftCard.aSenderEmail+'</Value>'+
                '</KeyValueOfstringstring>'+
                '<KeyValueOfstringstring xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">'+
                    '<Key>giftcard_'+data.aId+'.SenderName</Key>'+
                    '<Value>'+data.aGiftCard.aSenderName+'</Value>'+
                '</KeyValueOfstringstring>';
      body += productQuantityAttr;
      body +=    '</inputValues></AddToWhishlist></Body></Envelope>';

      let method = 'AddToWhishlist';
      this.generalService.webService(body,method).then(response => {
          console.log(response);
          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: this.wishListText,
            cssClass: 'mytoast',
            duration: 1500
          });
          toast.present(toast);

      },error =>{
        loader.dismiss();
        alert("No internet connection");

      });


  }

  share(event,data) {
      this.socialSharing.share(data.aFullDescription,data.aName,data.aDefaultPictureModel.aFullSizeImageUrl,"http://bahjah.azurewebsites.net").then(() => {
        console.log('shared');
      }).catch(() => {
        // Error!
      });;
  }

  convertToInteger(price, attrPrice){
    let totalPrice = parseInt(price) + parseInt(attrPrice);
    return totalPrice;
  }

  priceAttrOnChange(event) {
    // taking the price of attributes out with attribute value id coming from onchange of select box event
    for (let attrValue of this.attributeData ) {
       if (attrValue.aId == event) {
          this.data.FinalPrice = parseInt(attrValue.aPriceAdjustmentValue) + parseInt(this.product.price);
       }
    }
    // setting finalPriceAttr as attribute price Id
    this.data.FinalPriceAttr = event;
  }

}
