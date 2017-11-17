import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesEditComponent } from './choferes-edit.component';

describe('ChoferesEditComponent', () => {
  let component: ChoferesEditComponent;
  let fixture: ComponentFixture<ChoferesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoferesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
