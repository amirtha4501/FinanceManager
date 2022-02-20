import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  file: File;
  fileName = '';

  constructor(
    private fileUploadService: FileUploadService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
    // if (file) {
    //   this.fileName = file.name;
    //   const formData = new FormData();
    //   formData.append("thumbnail", file);

    //   let reader: FileReader = new FileReader();
    //   reader.readAsText(file);
    //   reader.onload = (e) => {
    //     let csv: string = reader.result as string;
    //     console.log(csv);
    //     this.fileUploadService.uploadXlsxData(csv).subscribe((res) => {
    //       console.log(res);
    //       this.toastService.success("Successfully imported");
    //     },
    //       (err) => {
    //         console.log(err);
    //         this.toastService.error("File import failed");
    //       }
    //     )

    //   }
    // console.log(formData, file);
    // }
  }

  upload() {
    const file: File = this.file;

    if (file) {
      this.fileName = file.name;
      // const formData = new FormData();
      // formData.append("thumbnail", file);

      let reader: FileReader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        let csv: string = reader.result as string;
        console.log(reader);
        this.fileUploadService.uploadXlsxData(csv).subscribe((res) => {
          console.log(res);
          this.toastService.success("Successfully imported");
        },
          (err) => {
            console.log(err);
            this.toastService.error("File import failed");
          }
        )
      }
    }
  }
}
