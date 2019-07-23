import { Component, OnInit, Input } from '@angular/core'
import { Cliente } from '../cliente'
import { ClienteService } from '../cliente.service'
import Swal from 'sweetalert2'
import { HttpEventType } from '@angular/common/http'
import { ModalService } from './modal.service'

@Component({
  selector: 'detail-client',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() client: Cliente
  public titel = 'Client Detail'
  private avatar: File
  public progress = 0

  constructor(
    private service: ClienteService,
    public modalService: ModalService
  ) {}

  ngOnInit() {}

  selectedImage(event) {
    if (event.target.files[0].type.indexOf('image') < 0) {
      Swal.fire('Error selected image:', `The file has type image`, 'error')
    } else {
      this.avatar = event.target.files[0]
      console.log(this.avatar)
      this.progress = 0
    }
  }

  uploadFile() {
    if (!this.avatar) {
      Swal.fire('Error upload:', `Selected a image`, 'error')
      return
    }

    this.service.uploadFile(this.avatar, this.client.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((event.loaded / event.total) * 100)
      }

      if (event.type === HttpEventType.Response) {
        const res = event.body
        this.client = res as Cliente

        this.modalService.notify.emit(this.client)
        Swal.fire(
          'Successfull',
          `The avatar is upload: ${this.client.avatar}`,
          'success'
        )
      }
    })
  }

  closeModal() {
    this.modalService.close()
    this.avatar = null
    this.progress = 0
  }
}
