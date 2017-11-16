import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesCreateComponent } from './choferes-create.component';

describe('ChoferesCreateComponent', () => {
  let component: ChoferesCreateComponent;
  let fixture: ComponentFixture<ChoferesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoferesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
