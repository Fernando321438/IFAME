import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoiceLanguagePage } from './choice-language.page';

describe('ChoiceLanguagePage', () => {
  let component: ChoiceLanguagePage;
  let fixture: ComponentFixture<ChoiceLanguagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceLanguagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoiceLanguagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
