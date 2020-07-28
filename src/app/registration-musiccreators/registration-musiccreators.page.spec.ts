import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrationMusiccreatorsPage } from './registration-musiccreators.page';

describe('RegistrationMusiccreatorsPage', () => {
  let component: RegistrationMusiccreatorsPage;
  let fixture: ComponentFixture<RegistrationMusiccreatorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationMusiccreatorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationMusiccreatorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
