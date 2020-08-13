import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCryptoPage } from './view-crypto.page';

describe('ViewCryptoPage', () => {
  let component: ViewCryptoPage;
  let fixture: ComponentFixture<ViewCryptoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCryptoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCryptoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
