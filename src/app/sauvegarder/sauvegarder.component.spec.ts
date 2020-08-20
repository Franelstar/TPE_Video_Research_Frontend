import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SauvegarderComponent } from './sauvegarder.component';

describe('SauvegarderComponent', () => {
  let component: SauvegarderComponent;
  let fixture: ComponentFixture<SauvegarderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SauvegarderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SauvegarderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
