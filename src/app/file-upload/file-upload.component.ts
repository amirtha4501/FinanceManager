import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { ToastService } from '../services/toast.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  file: File;
  fileName = '';
  transactionData

  constructor(
    private fileUploadService: FileUploadService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.transactionData = jsonData.Sheet1
      console.log(this.transactionData);
    }
    reader.readAsBinaryString(file);
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
    this.fileUploadService.uploadXlsxData(this.transactionData).subscribe((res) => {
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
