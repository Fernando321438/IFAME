import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/firestore';
import { UsersService,Users } from '../services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  user: any = {};
  credenziali: Users = {
  Name: '',
  Surname: '',
  Phone_Number: '',

  }
  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public authService: AuthService,
    public router: Router,
    public afs: AngularFirestore,
    private usersService: UsersService,
    private toastCtrl: ToastController,
    private afDB: AngularFireDatabase,
    private authObj : AngularFireAuth,

  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  if (id) {
    this.usersService.getUsers(id).subscribe(users => {
      this.user = users;
    });
  }
}

  signUp() {
    if (this.user.email && this.user.password && (this.user.validatepassword === this.user.password) && this.user.name && this.user.surname && this.user.phone_number) {
      
      this.authObj.createUserWithEmailAndPassword(this.user.email, this.user.password).then(async (ges) => {
        console.log(ges);

        const datages = {
          email:this.user.email,
          Name:this.user.name, Surname:this.user.surname, Phone_Number: this.user.phone_number,
          createdAt: Date.now()
        };
        const usersFire1 = this.afs.collection('users');
        await usersFire1.ref.doc().set(datages).then(() => {
          this.router.navigateByUrl('/view-users');
          this.showToast('users added');
        }).catch(e => {
          console.log(e);
        })

      })
    } else { this.showToast('The two passwords are not associated or has not been filled in some field'); }

  }
  validation() {

    if (this.user.email!= null && this.user.password != null && this.user.name != null
      && this.user.surname != null && this.user.phone_number != null ) {
      if (this.user.validatepassword === this.user.password)
       {
         return true;
      } 
      else {
        this.showToast('The two passwords are not associated');
        return false;
      }
    } else {
      this.showToast('Compilare tutti i campi');
      return false;
    }
  }


  deleteUsers() {
    this.usersService.deleteUsers(this.user).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('users deleted');
    }, err => {
      this.showToast('Errore eliminazione dell_users:(');

    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}