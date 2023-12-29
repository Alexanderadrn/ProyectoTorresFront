import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmpleados } from '../interface/Empleados';



@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  urlbase = 'https://localhost:7244/api/'
  controlador = 'Empleados/'

  constructor(private httpClient: HttpClient) { }

  getEmpleados(): Observable<any> {
    var metodo = 'ObtenerEmpleados'
    return this.httpClient.get<any>(this.urlbase + this.controlador + metodo);
  }
  setEmpleados(datosEmpleados: any) {
    alert("ingresa a la bd")
    var metodo = 'setEmpleado'
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, datosEmpleados)
  }
  updateEmpleados(datosEmpleados: any) {
    var metodo = 'putEmpleado'
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, datosEmpleados)
  }
  deleteEmpleados(id: number) {
    var metodo='deletEmpleado'
    let params = new HttpParams()
      .append("id", id)
    console.log(id);
    const headers = new HttpHeaders().set('content-type', 'application/json')
    return this.httpClient.post<any>(this.urlbase + this.controlador + metodo, id, { headers, params });
  }
  getCargos():Observable<any>{
    var metodo= 'ObtenerCargos'
    return this.httpClient.get<any>(this.urlbase+this.controlador+metodo);
  }
  getDepartamentos():Observable<any>{
    var metodo= 'ObtenerDepartamentos'
    return this.httpClient.get<any>(this.urlbase+this.controlador+metodo);
  }
  GetUsuariosFiltros(empleados : IEmpleados): Observable<any>{
    let header = new HttpHeaders()
  .set('Type-content','aplication/json')
    return this.httpClient.post<any>(this.urlbase+this.controlador+'GetUsuariosFiltros',empleados);
  }
}
