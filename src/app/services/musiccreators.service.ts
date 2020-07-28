import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
export class Musiccreators {
  id?:string;
  Name :string;
  Surname: string;
  Address: string;
  Company_name: string;
  Contract_Number: string;
  Phone_Number: string;
  Genres: string;
  Royalties: string;
  Join: string;
}

@Injectable({
  providedIn: 'root'
})
export class MusiccreatorsService {
  user: any = {};
  private musiccreators: Observable<Musiccreators[]>;
  private musiccreatorsCollection: AngularFirestoreCollection<Musiccreators>;

  constructor(private readonly afs: AngularFirestore) {
    this.musiccreatorsCollection = this.afs.collection<Musiccreators>('music-creators');
    this.musiccreators = this.musiccreatorsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });

      })
    );

  }
  getMusiccreatorss(): Observable<Musiccreators[]> {
    return this.musiccreators;
  }
  getMusiccreators(id: string): Observable<Musiccreators> {
    return this.musiccreatorsCollection.doc<Musiccreators>(id).valueChanges().pipe(
      take(1),
      map(musiccreators => {
        musiccreators.id = id;
        return musiccreators
      })
    );
  }
  addMusiccreators(musiccreators: Musiccreators): Promise<DocumentReference> {
    return this.musiccreatorsCollection.add(musiccreators);
  }

  updateMusiccreators(musiccreators: Musiccreators): Promise<void> {
    return this.musiccreatorsCollection.doc(musiccreators.id).update({ Name: musiccreators.Name, Surname: musiccreators.Surname, Address: musiccreators.Address , Company_name: musiccreators.Company_name , Contract_Number: musiccreators.Contract_Number , Phone_Number: musiccreators.Phone_Number , Genres: musiccreators.Genres, Royalties: musiccreators.Royalties, Join: musiccreators.Join  });
  }

  deleteMusiccreators(musiccreators: Musiccreators): Promise<void> {
    return this.musiccreatorsCollection.doc(musiccreators.id).delete();
  }
}