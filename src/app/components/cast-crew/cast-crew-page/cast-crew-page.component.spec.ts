import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastCrewPageComponent } from './cast-crew-page.component';

describe('CastCrewPageComponent', () => {
  let component: CastCrewPageComponent;
  let fixture: ComponentFixture<CastCrewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastCrewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastCrewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
