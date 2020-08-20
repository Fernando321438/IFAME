import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivePage } from './live.page';

describe('LivePage', () => {
  let component: LivePage;
  let fixture: ComponentFixture<LivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create the app', () => {
    const fixture = TestBed.createComponent(LivePage);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
it(`should have as title 'musicreco'`, () => {
    const fixture = TestBed.createComponent(LivePage);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('musicreco');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(LivePage);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to musicreco!');
  });
});
