import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './fcm.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.loadFirebase();
    });
  }

  loadFirebase() {
    console.log("hola");
    // Get a FCM token
    this.fcm.getToken()

    // Listen to incoming messages
    this.fcm.listenToNotifications().pipe(
        tap(async msg => {
          // show a toast
          console.log("Me ha llegado notificacion")
          const toast = await this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          return await toast.present();
        })
    )
        .subscribe()
  }
}