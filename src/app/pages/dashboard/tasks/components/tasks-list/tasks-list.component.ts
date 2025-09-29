import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Task } from '@shared/models/task.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { debounceTime, fromEvent, map, merge, startWith, switchMap } from 'rxjs';
import { TasksService } from '@app/shared/services/tasks.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '../card/card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class TasksListComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'status', 'createdAt', 'completedAt', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;
  // dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  dataSource = signal<Task[]>([]);
  totalCount = signal(0);
  isLoadingResults = signal(true);
  readonly tasksService = inject(TasksService);
  readonly dialog: MatDialog = inject(MatDialog);

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    const search$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map(() => this.searchInput.nativeElement.value),
      debounceTime(500)
    );
    merge(this.sort.sortChange, this.paginator.page, search$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults.set(true);
          const filter = this.searchInput.nativeElement.value;
          const sort = {
            sortBy: this.sort.active || 'createdAt',
            sortDirection: this.sort.direction || 'desc',
          };
          return this.tasksService.searchTasks$(
            filter,
            sort.sortBy,
            sort.sortDirection,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize || 10
          );
        })
      )
      .subscribe((result) => {
        // this.dataSource = new MatTableDataSource<Task>(result.items);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        this.dataSource.set(result.items);
        this.totalCount.set(result.totalCount);
        this.isLoadingResults.set(false);
      });
  }
  editTask(task: Task) {
    const dialogRef = this.dialog.open(CardComponent, {
      disableClose: true,
      data: { ...task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paginator.page.emit(); // Trigger a refresh
      }
    });
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask$(task.id).subscribe(() => {
      this.paginator.page.emit(); // Trigger a refresh
    });
  }

  openNewTaskDialog() {
    const dialogRef = this.dialog.open(CardComponent, {
      disableClose: true,
      data: { title: '', description: '', status: 'Draft' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paginator.page.emit(); // Trigger a refresh
      }
    });
  }
}
