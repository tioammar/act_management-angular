import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgressComponent } from './add-progress.component';

describe('AddProgressComponent', () => {
  let component: AddProgressComponent;
  let fixture: ComponentFixture<AddProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
