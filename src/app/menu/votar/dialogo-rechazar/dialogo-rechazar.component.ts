import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
export interface DialogData {
  motivo: string;
}
@Component({
  selector: 'app-dialogo-rechazar',
  templateUrl: './dialogo-rechazar.component.html',
  styleUrls: ['./dialogo-rechazar.component.css']
})
export class DialogoRechazarComponent implements OnInit {

  rayo = 'rayo';
  avion = 'avion';
  eei = 'eei';
  otro = 'otro';
  constructor(public dialogRef: MatDialogRef<DialogoRechazarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
}
