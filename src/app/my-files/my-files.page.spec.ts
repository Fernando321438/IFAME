import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyFilesPage } from './my-files.page';

describe('MyFilesPage', () => {
  let component: MyFilesPage;
  let fixture: ComponentFixture<MyFilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFilesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyFilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
