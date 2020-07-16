import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecorderPage } from './recorder.page';

describe('RecorderPage', () => {
  let component: RecorderPage;
  let fixture: ComponentFixture<RecorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecorderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
