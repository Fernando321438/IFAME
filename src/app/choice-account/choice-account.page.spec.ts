import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoiceAccountPage } from './choice-account.page';

describe('ChoiceAccountPage', () => {
  let component: ChoiceAccountPage;
  let fixture: ComponentFixture<ChoiceAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoiceAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
