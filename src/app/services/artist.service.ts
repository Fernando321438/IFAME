import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export class Artist {
  id?: string;
  Typeartist: string;
  Name: string;
  Surname: string;
  Alias: string;
  Id_work: string;
  My_songs: string;
  Genres: string;
  Royalties: string;
  recordname: any;
}

@Injectable({
  providedIn: "root",
})
export class ArtistService {
  user: any = {};
  private artist: Observable<Artist[]>;
  private artistCollection: AngularFirestoreCollection<Artist>;

  constructor(private readonly afs: AngularFirestore) {
    this.artistCollection = this.afs.collection<Artist>("artist");
    this.artist = this.artistCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getArtists(): Observable<Artist[]> {
    return this.artist;
  }
  getArtist(id: string): Observable<Artist> {
    return this.artistCollection
      .doc<Artist>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((artist) => {
          artist.id = id;
          return artist;
        })
      );
  }
  addArtist(artist: Artist): Promise<DocumentReference> {
    return this.artistCollection.add(artist);
  }

  updateArtist(artist: Artist): Promise<void> {
    return this.artistCollection
      .doc(artist.id)
      .update({
        Typeartist: artist.Typeartist,
        Name: artist.Name,
        Surname: artist.Surname,
        Alias: artist.Alias,
        Id_work: artist.Id_work,
        My_songs: artist.My_songs,
        Genres: artist.Genres,
        Royalties: artist.Royalties,
      });
  }

  deleteArtist(artist: Artist): Promise<void> {
    return this.artistCollection.doc(artist.id).delete();
  }
}
