import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: "root"
})
export class DataService {
  records: any=[];
  songs: any=[]; 
  constructor( private afs: AngularFirestore) {
    this.afs.collection('/Live Record').valueChanges()
    .subscribe(records => {
      this.records = records;
      console.log(this.records);

    })  
    
   this.afs.collection('/Digital Record').valueChanges()
    .subscribe(songs => {
      this.songs = songs;
      console.log(this.songs);

    })  
  }

  filterRecords(searchTerm) {
    return this.records.filter(record => {
      return record.Recordname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  filterSongs(searchTerm) {
    return this.songs.filter(song => {
      return song.Songname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}