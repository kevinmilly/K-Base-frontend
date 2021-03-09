import { Component, OnInit, Input, ViewChildren, QueryList} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'kb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableData: any;
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  dataSource: MatTableDataSource<any>;

  elementColumns: string[] = [];


  constructor() { 
    this.dataSource = new MatTableDataSource<any>(this.tableData.data);
    this.dataSource.sort = this.sort.toArray()[0];
 
  }

  ngOnInit(): void {
   
    this.elementColumns = this.tableData.columns;


  }

}
