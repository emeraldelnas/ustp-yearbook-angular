import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateDetailComponent } from './graduate-detail.component';

describe('GraduateDetailComponent', () => {
  let component: GraduateDetailComponent;
  let fixture: ComponentFixture<GraduateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
