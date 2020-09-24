import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewUsers3Page } from './view-users3.page';

describe('ViewUsers3Page', () => {
  let component: ViewUsers3Page;
  let fixture: ComponentFixture<ViewUsers3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsers3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUsers3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
