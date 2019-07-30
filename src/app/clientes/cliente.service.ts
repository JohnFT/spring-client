import { Injectable } from '@angular/core'
import { CLIENTES } from './clientes.json'
import { Cliente, Region } from './cliente'
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent
} from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import swal from 'sweetalert2'
import { Router } from '@angular/router'

@Injectable()
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api/clients'
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint)
  }

  getClients(page: number): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndPoint + '/page/' + page)
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regions')
  }


  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlEndPoint + '/' + id).pipe(
      catchError(e => {
        this.router.navigate(['/clients'])
        swal.fire('Error', e.error.message, 'error')
        return throwError(e)
      })
    )
  }

  add(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, {
        headers: this.headers
      })
      .pipe(
        catchError(e => {
          if (e.status === 400) {
            return throwError(e)
          }

          swal.fire('Error', e.error.message, 'error')
          return throwError(e)
        })
      )
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(this.urlEndPoint + '/' + cliente.id, cliente, {
        headers: this.headers
      })
      .pipe(
        catchError(e => {
          if (e.status === 400) {
            return throwError(e)
          }
          swal.fire('Error', e.error.message, 'error')
          return throwError(e)
        })
      )
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(this.urlEndPoint + '/' + id, {
        headers: this.headers
      })
      .pipe(
        catchError(e => {
          this.router.navigate(['/clients'])
          swal.fire('Error', e.error.message, 'error')
          return throwError(e)
        })
      )
  }

  uploadFile(file: File, id): Observable<HttpEvent<Cliente>> {
    const formDate = new FormData()
    formDate.append('file', file)
    formDate.append('id', id)

    const req = new HttpRequest(
      'POST',
      this.urlEndPoint + '/upload',
      formDate,
      {
        reportProgress: true
      }
    )
    return this.http.request<Cliente>(req)
  }


}
