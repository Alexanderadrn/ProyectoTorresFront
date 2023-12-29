import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IEmpleados } from 'src/app/interface/Empleados';
import { EmpleadosService } from 'src/app/service/empleados.service';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validator } from '@angular/forms';


@Component({
  selector: 'app-registrar-empleados',
  templateUrl: './registrar-empleados.component.html',
  styleUrls: ['./registrar-empleados.component.css']
})


export class RegistrarEmpleadosComponent {
  titulo: string = "Registrar"

  empleados: IEmpleados = {
    idEmpleados: 0,
    usuario: "",
    primernombre: "",
    segundonombre: "",
    primerapellido: "",
    segundoapellido: '',
    iddepartamento: 0,
    departamento: "",
    idcargo: 0,
    cargo: "",
    email: "",
  }
  public cargos: any[] = []
  public departamento: any[] = []
  expresiones = {
    texto: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    correo_: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  }
  constructor(
    private empleadosService: EmpleadosService,
    
    private matDialog: MatDialog
  ) { }


  ngOnDestroy(): void {
    localStorage.removeItem("usuario")
  }
  ngOnInit(): void {
    this.obtenerDatos();
    this.getCargos();
    this.getDepartamentos();
  }

  obtenerDatos() {
    if (localStorage.getItem("usuario")) {
      var datos = localStorage.getItem("usuario")
      this.empleados = JSON.parse(datos!)
      this.titulo = "Actualizar"
    }
  }
  getDepartamentos() {
    this.empleadosService.getDepartamentos().subscribe(resp => {
      console.log(resp)
      this.departamento = resp
    });
  }
  getCargos() {
    this.empleadosService.getCargos().subscribe(resp => {
      console.log(resp)
      this.cargos = resp
    });
  }
  onKeyPressTexto(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(input)) {
      event.preventDefault();
    }
  }
  ValidarCorreo(event:KeyboardEvent){
    const input=event.key;
    const validar =  /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
    if(!validar.test(input)){
      event.preventDefault();
    }
  }
  validarDatos() {
    if (this.expresiones.texto.test(this.empleados.primernombre)
      && this.expresiones.texto.test(this.empleados.segundonombre)
      && this.expresiones.texto.test(this.empleados.primerapellido)
      && this.expresiones.texto.test(this.empleados.segundoapellido)
      && this.expresiones.correo_.test(this.empleados.email)
    ) {

      return true;
    }
    else if (this.expresiones.correo_.test(this.empleados.email)) {
      alert("Ingrese un correo valido")
      return false;
    } else {
      alert("Los datos son incorrectos")
      return false;
    }
  }

  setPersonas() {
    if (this.validarDatos()) {
    if (this.empleados.idEmpleados == 0) {
      this.empleadosService.setEmpleados(this.empleados).subscribe(resp => {
        if (resp) {
          alert(resp)
          console.log(resp)
        } else {
          alert("No se pudo registrar")
        }
      });
    } else {
      this.empleadosService.updateEmpleados(this.empleados).subscribe(resp => {
        if (resp) {
          localStorage.removeItem("usuario");
          this.matDialog.closeAll();
        }
        else {
          alert("No se pudo editar la persona");
        }
      });
    }
    this.matDialog.closeAll();
  }}
  dismissModal() {
    this.matDialog.closeAll();
  }
}


