import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewUsers2Page } from './view-users2.page';

describe('ViewUsers2Page', () => {
  let component: ViewUsers2Page;
  let fixture: ComponentFixture<ViewUsers2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsers2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUsers2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
