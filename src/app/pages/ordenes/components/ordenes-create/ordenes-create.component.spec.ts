import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesCreateComponent } from './ordenes-create.component';

describe('OrdenesCreateComponent', () => {
  let component: OrdenesCreateComponent;
  let fixture: ComponentFixture<OrdenesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
