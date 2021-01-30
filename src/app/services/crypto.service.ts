import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export class Crypto {
  id?: string;
  Name: string;
  Surname: string;
  Address: string;
  Phone_Number: string;
  Id_passport: string;
  Proof_of_Residence: string;
  Deposite: string;
}

@Injectable({
  providedIn: "root",
})
export class CryptoService {
  user: any = {};
  private crypto: Observable<Crypto[]>;
  private cryptoCollection: AngularFirestoreCollection<Crypto>;

  constructor(private readonly afs: AngularFirestore) {
    this.cryptoCollection = this.afs.collection<Crypto>("crypto");
    this.crypto = this.cryptoCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getCryptos(): Observable<Crypto[]> {
    return this.crypto;
  }
  getCrypto(id: string): Observable<Crypto> {
    return this.cryptoCollection
      .doc<Crypto>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((crypto) => {
          crypto.id = id;
          return crypto;
        })
      );
  }
  addCrypto(crypto: Crypto): Promise<DocumentReference> {
    return this.cryptoCollection.add(crypto);
  }

  updateCrypto(crypto: Crypto): Promise<void> {
    return this.cryptoCollection
      .doc(crypto.id)
      .update({
        Name: crypto.Name,
        Surname: crypto.Surname,
        Address: crypto.Address,
        Phone_Number: crypto.Phone_Number,
        Id_passport: crypto.Id_passport,
        Proof_of_Residence: crypto.Proof_of_Residence,
        Deposite: crypto.Deposite,
      });
  }

  deleteCrypto(crypto: Crypto): Promise<void> {
    return this.cryptoCollection.doc(crypto.id).delete();
  }
}
