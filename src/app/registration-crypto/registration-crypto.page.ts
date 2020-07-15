import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/firestore';
import { CryptoService,Crypto } from '../services/crypto.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration-crypto.page.html',
  styleUrls: ['./registration-crypto.page.scss'],
})

export class RegistrationCryptoPage implements OnInit {

  crypto_buyer: any = {};
  creators: Crypto = {

  Name: '',
  Surname: '',
  Address: '',
  Phone_Number: '',
  Id_passport: '',
  Proof_of_Residence: '',
  Deposite: '',
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public authService: AuthService,
    public router: Router,
    public afs: AngularFirestore,
    private cryptoService: CryptoService,
    private toastCtrl: ToastController,
    private afDB: AngularFireDatabase,
    private authObj : AngularFireAuth,
  ) { }

  ngOnInit() { 
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  if (id) {
    this.cryptoService.getCrypto(id).subscribe(crypto => {
      this.crypto_buyer = crypto;
    });
  }
}

  signUp() {
    if (this.crypto_buyer.email && this.crypto_buyer.password && (this.crypto_buyer.validatepassword === this.crypto_buyer.password) 
    && this.crypto_buyer.name && this.crypto_buyer.surname && this.crypto_buyer.address && this.crypto_buyer.phone_number && this.crypto_buyer.id_passport && this.crypto_buyer.proof_of_residence && this.crypto_buyer.deposite) {


      this.authObj.createUserWithEmailAndPassword(this.crypto_buyer.email, this.crypto_buyer.password).then(async (ges) => {
        console.log(ges);

        const datages = {
          email:this.crypto_buyer.email,
          Name: this.crypto_buyer.name, Surname: this.crypto_buyer.surname, Address: this.crypto_buyer.address,
          Phone_Number: this.crypto_buyer.phone_number, Id_passport: this.crypto_buyer.id_passport, Proof_of_Residence: this.crypto_buyer.proof_of_residence, 
          Deposite: this.crypto_buyer.deposite, createdAt: Date.now()
        };
        const cryptoFire1 = this.afs.collection('crypto');
        await cryptoFire1.ref.doc().set(datages).then(() => {
          this.router.navigateByUrl('/view-crypto');
          this.showToast('crypto added');
        }).catch(e => {
          console.log(e);
        })

      })
    } else { this.showToast('The two passwords are not associated or has not been filled in some field'); }

  }
  validation() {

    if (this.crypto_buyer.email!= null && this.crypto_buyer.password != null && this.crypto_buyer.Name != null
      && this.crypto_buyer.surname != null && this.crypto_buyer.address != null && this.crypto_buyer.phone_number != null
      && this.crypto_buyer.id_passport!= null && this.crypto_buyer.proof_of_residence!= null && this.crypto_buyer.deposite) {
      if (this.crypto_buyer.validatepassword === this.crypto_buyer.password)
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


  deleteCrypto() {
    this.cryptoService.deleteCrypto(this.crypto_buyer).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('crypto deleted');
    }, err => {
      this.showToast('Errore eliminazione del crypto buyer:(');

    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}