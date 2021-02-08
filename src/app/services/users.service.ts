import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export class Users {
  id?: string;
  Name: string;
  Surname: string;
  Phone_Number: string;
  /*   Map_songs: Geolocation;
   */
}

@Injectable({
  providedIn: "root",
})
export class UsersService {
  user: any = {};
  private users: Observable<Users[]>;
  private usersCollection: AngularFirestoreCollection<Users>;

  constructor(private readonly afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<Users>("users");
    this.users = this.usersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getUserss(): Observable<Users[]> {
    return this.users;
  }
  getUsers(id: string): Observable<Users> {
    return this.usersCollection
      .doc<Users>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((users) => {
          users.id = id;
          return users;
        })
      );
  }
  addUsers(users: Users): Promise<DocumentReference> {
    return this.usersCollection.add(users);
  }

  updateUsers(users: Users): Promise<void> {
    return this.usersCollection
      .doc(users.id)
      .update({
        Name: users.Name,
        Surname: users.Surname,
        Phone_Number: users.Phone_Number,
      });
  }

  deleteUsers(users: Users): Promise<void> {
    return this.usersCollection.doc(users.id).delete();
  }
}
