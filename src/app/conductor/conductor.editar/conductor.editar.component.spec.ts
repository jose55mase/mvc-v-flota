import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Conductor.EditarComponent } from './conductor.editar.component';

describe('Conductor.EditarComponent', () => {
  let component: Conductor.EditarComponent;
  let fixture: ComponentFixture<Conductor.EditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Conductor.EditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Conductor.EditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
