import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyfilesPage } from './myfiles.page';

describe('MyfilesPage', () => {
  let component: MyfilesPage;
  let fixture: ComponentFixture<MyfilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfilesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyfilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
