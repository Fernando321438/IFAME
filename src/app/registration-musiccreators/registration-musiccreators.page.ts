import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/firestore';
import { MusiccreatorsService,Musiccreators} from '../services/musiccreators.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-registration',
  templateUrl: './registration-musiccreators.page.html',
  styleUrls: ['./registration-musiccreators.page.scss'],
})

export class RegistrationMusiccreatorsPage implements OnInit {

  musiccreators: any = {};
  creators: Musiccreators = {

    Name: '',
    Surname: '',
    Address: '',
    Company_name: '',
    Contract_Number: '',
    Phone_Number: '',
    Genres: '',
    Royalties: '',
    Join: '',
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public authService: AuthService,
    public router: Router,
    public afs: AngularFirestore,
    private musiccreatorsService: MusiccreatorsService,
    private toastCtrl: ToastController,
    private afDB: AngularFireDatabase,
    private authObj : AngularFireAuth,
    public  afAuth: AngularFireAuth,


  ) { }

  ngOnInit() { 
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.musiccreatorsService.getMusiccreators(id).subscribe(musiccreators => {
        this.musiccreators = musiccreators;
      });
    }
  }

  signUp() {
    if (this.musiccreators.email && this.musiccreators.password && (this.musiccreators.validatepassword === this.musiccreators.password) 
    && this.musiccreators.name && this.musiccreators.surname && this.musiccreators.address && this.musiccreators.company_name && this.musiccreators.contract_number
    && this.musiccreators.phone_number && this.musiccreators.genres && this.musiccreators.royalties && this.musiccreators.join) {



        this.authObj.createUserWithEmailAndPassword(this.musiccreators.email, this.musiccreators.password).then(async (ges) => {
          console.log(ges);
  
          const datages = {
            email:this.musiccreators.email,
            Name: this.musiccreators.name, Surname: this.musiccreators.surname, Address: this.musiccreators.address,
            Company_Name: this.musiccreators.company_name, Contract_Number:this.musiccreators.contract_number, Phone_Number: this.musiccreators.phone_number, 
            Genres: this.musiccreators.genres, Royalties: this.musiccreators.royalties, Join: this.musiccreators.join,createdAt: Date.now()
          };
          const musiccreatorsFire1 = this.afs.collection('music-creators');
          await musiccreatorsFire1.ref.doc().set(datages).then(() => {
            this.router.navigateByUrl('/view-musiccreators');
            this.showToast('musicccreators added');
          }).catch(e => {
            console.log(e);
          })
  
        })
      } else { this.showToast('Le due password non corrispondono o non è stato compilato qualche campo'); }
  
    }
    validation() {
  
      if (this.musiccreators.email!= null && this.musiccreators.password != null && this.musiccreators.name != null
        && this.musiccreators.surname != null && this.musiccreators.address != null && this.musiccreators.company_name != null
        && this.musiccreators.contract_number != null && this.musiccreators.phone_number!= null && this.musiccreators.genres != null && this.musiccreators.royalties != null && this.musiccreators.join != null) {
        if (this.musiccreators.validatepassword === this.musiccreators.password)
         {
           return true;
        } 
        else {
          this.showToast('Le due password non corrispondono');
          return false;
        }
      } else {
        this.showToast('Compilare tutti i campi');
        return false;
      }
    }
  
  
    deleteMusiccreators() {
      this.musiccreatorsService.deleteMusiccreators(this.musiccreators).then(() => {
        this.router.navigateByUrl('/');
        this.showToast('musiccreators deleted');
      }, err => {
        this.showToast('Errore eliminazione del gestore:(');
  
      });
    }
  
    showToast(msg) {
      this.toastCtrl.create({
        message: msg,
        duration: 2000
      }).then(toast => toast.present());
   
    }
    async logout(){
      await this.afAuth.signOut();
      this.router.navigateByUrl('/login-register');
    }
  }