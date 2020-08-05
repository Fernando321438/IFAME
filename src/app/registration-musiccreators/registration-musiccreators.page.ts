import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { NavController } from '@ionic/angular';
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

    Artist: '',
    Song: '',
    Songwriter: '',
    Name: '',
    Surname: '',
    Address: '',
    Labels: '',
    Contract_Number: '',
    Phone_Number: '',
    Genres: '',
    Year_Released:'',
    Producer: '',
    Royalties: '',
    Textsongname:'',
    Songname:'',
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public authService: AuthService,
    public router: Router,
    public afs: AngularFirestore,
    private musiccreatorsService: MusiccreatorsService,
    private toastCtrl: ToastController,
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
    && this.musiccreators.artist && this.musiccreators.name && this.musiccreators.surname && this.musiccreators.address  && this.musiccreators.contract_number
    && this.musiccreators.phone_number && this.musiccreators.year_released && this.musiccreators.royalties) {



        this.authObj.createUserWithEmailAndPassword(this.musiccreators.email, this.musiccreators.password).then(async (ges) => {
          console.log(ges);
  
          const userId = (await this.authObj.currentUser).uid;
          const datages = {
            email:this.musiccreators.email,
            Artist: this.musiccreators.artist,
            Name: this.musiccreators.name, Surname: this.musiccreators.surname, Address: this.musiccreators.address,
            Contract_Number:this.musiccreators.contract_number, Phone_Number: this.musiccreators.phone_number, 
            Year_Released: this.musiccreators.year_released,  Royalties: this.musiccreators.royalties,createdAt: Date.now()
          };
          const musiccreatorsFire1 = this.afs.collection('music-creators');
          await musiccreatorsFire1.ref.doc(userId).set(datages).then(() => {
            this.router.navigateByUrl('/view-musiccreators');
            this.showToast('musicccreators added');
          }).catch(e => {
            console.log(e);
          })
  
        })
      } else { this.showToast('Le due password non corrispondono o non è stato compilato qualche campo'); }
  
    }
    validation() {
  
      if (this.musiccreators.email!= null && this.musiccreators.password != null && this.musiccreators.artist != null
        && this.musiccreators.name != null
        && this.musiccreators.surname != null && this.musiccreators.address != null 
        && this.musiccreators.contract_number != null && this.musiccreators.phone_number!= null
        && this.musiccreators.year_released != null && this.musiccreators.royalties != null) {
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