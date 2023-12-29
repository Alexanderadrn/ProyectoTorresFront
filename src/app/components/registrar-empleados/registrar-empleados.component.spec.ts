import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEmpleadosComponent } from './registrar-empleados.component';

describe('RegistrarEmpleadosComponent', () => {
  let component: RegistrarEmpleadosComponent;
  let fixture: ComponentFixture<RegistrarEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarEmpleadosComponent]
    });
    fixture = TestBed.createComponent(RegistrarEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
