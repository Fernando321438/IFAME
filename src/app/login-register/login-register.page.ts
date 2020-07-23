import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login-register',
  templateUrl: 'login-register.page.html',
  styleUrls: ['login-register.page.scss'],
})
export class LoginRegisterPage {

  tasks: any = [];
  constructor(
    private readonly menuCtrl:MenuController,
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    private readonly afFirestore: AngularFirestore,
    private readonly alertCtrl: AlertController,
  ) {
    this.menuCtrl.enable(false, 'first')
   }

  add() {
    this.alertCtrl.create({
      message: "task",
      inputs: [
        { type: 'text', name: 'title' },
        { type: 'textarea', name: 'desc' }
      ],
      buttons: [
        {
          text: 'Add', handler: async (res) => {
            console.log(res);

            this.afFirestore.collection((await this.auth.currentUser).uid).add({
              title: res.title,
              desc: res.desc,
              createdAt: Date.now(),
              isDone: false
            });

          }
        }, {
          text: 'Cancel'
        }
      ]
    }).then(a => a.present());
  }


  async fetch() {
    this.afFirestore.collection((await this.auth.currentUser).uid).snapshotChanges().subscribe((res: any) => {
      console.log(res);
      const tmp = [];
      res.forEach(task => {
        tmp.push({ key: task.payload.doc.id, ...task.payload.doc.data() });
      })
      console.log(tmp);
      this.tasks = tmp;
    })
  }


  async update(id, isDone) {
    this.afFirestore.collection((await this.auth.currentUser).uid).doc(id).update({
      isDone: !isDone
    });
  }

  async delete(id) {
    this.afFirestore.collection((await this.auth.currentUser).uid).doc(id).delete();
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    }).catch(e => {
      console.log(e);
    })
  }
}