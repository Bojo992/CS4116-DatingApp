import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

@Component({
  selector: 'app-report-dialog',
  standalone: true,
  imports: [
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport
  ],
  templateUrl: './report-dialog.component.html',
  styleUrl: './report-dialog.component.css'
})
export class ReportDialogComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: string[] ) {
    console.log(data);
  }
}
