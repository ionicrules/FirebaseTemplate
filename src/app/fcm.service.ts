import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import {AngularFirestore} from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {}

  async getToken() {

    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
      console.log(token);
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      const perm = await this.firebaseNative.grantPermission();
    } 
    
    // Is not cordova == web PWA
    if (!this.platform.is('cordova')) {
      // TODO add PWA support with angularfire2
    } 

    return this.saveTokenToFirestore(token)
  }

  private saveTokenToFirestore(token) {
    if (!token) return;
    const devicesRef = this.afs.collection('devices')

    const docData = { 
      token,
      userId: 'testUser',
    };

    return devicesRef.doc(token).set(docData)
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }

}
