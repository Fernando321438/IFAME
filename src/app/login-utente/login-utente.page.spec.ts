import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginUtentePage } from './login-utente.page';

describe('LoginUtentePage', () => {
  let component: LoginUtentePage;
  let fixture: ComponentFixture<LoginUtentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUtentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginUtentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
