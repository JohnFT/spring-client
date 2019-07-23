import { Component, OnInit } from '@angular/core'
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'
import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public client: Cliente = new Cliente()
  public title = 'Add Client'
  public errors: string[] = []
  constructor(
    private service: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getClient()
  }

  public getClient(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id
      if (id) {
        this.service.getById(id).subscribe(res => {
          this.client = res
        })
      }
    })
  }

  public create(): void {
    let obserbale

    if (this.client.id) {
      obserbale = this.service.update(this.client)
    } else {
      obserbale = this.service.add(this.client)
    }

    obserbale.subscribe(
      res => {
        swal.fire(
          'Save Client',
          `Client ${res.firstName} created successfull`,
          'success'
        )
        this.router.navigate(['/'])
      },
      err => {
        this.errors = err.error.errors as string[]
        console.log(this.errors, err.status)
      }
    )
  }
}
