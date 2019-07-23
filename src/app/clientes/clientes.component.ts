import { Component, OnInit } from '@angular/core'
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'
import swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router'
import { ModalService } from './detail/modal.service'
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[]
  paginator: any
  client: Cliente
  constructor(
    private clienteService: ClienteService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const page: number = params.page

      this.clienteService.getClients(page || 0).subscribe((response: any) => {
        this.paginator = response
        this.clientes = response.content as Cliente[]
      })
    })
    this.modalService.notify.subscribe(client => {
      this.clientes.map(c => {
        if (c.id === client.id) {
          {
            c.avatar = client.avatar
          }
        }
      })
    })
  }

  public delete(cliente: Cliente): void {
    swal
      .fire({
        title: 'Are you sure?',
        type: 'warning',
        text: 'you wont be able to reert this!',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: true,
        showConfirmButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      })
      .then(res => {
        if (res.value) {
          this.clienteService.delete(cliente.id).subscribe(() => {
            swal.fire(
              'Deleted!',
              `your client ${cliente.firstName} has been deleted`,
              'success'
            )
            this.clientes = this.clientes.filter(cl => cl.id !== cliente.id)
          })
        }
      })
  }

  openModal(client) {
    this.client = client
    this.modalService.open()
  }
}
