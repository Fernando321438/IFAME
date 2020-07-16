import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewArtistPage } from './view-artist.page';

describe('ViewArtistPage', () => {
  let component: ViewArtistPage;
  let fixture: ComponentFixture<ViewArtistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewArtistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewArtistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
