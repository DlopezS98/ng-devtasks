import { CommonModule, DatePipe } from "@angular/common";
import { AfterViewInit, Component, inject, signal, ViewChild } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { Task } from "../../../../../shared/models/task.model";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { merge, startWith, switchMap } from "rxjs";
import { KanbanService } from "../../../../../shared/services/kanban.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatSortModule, MatPaginatorModule, DatePipe],
})
export class TasksListComponent implements AfterViewInit{
  displayedColumns: string[] = ['title', 'status', 'createdAt', 'completedAt'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = signal<Task[]>([]);
  totalCount = signal(0);
  isLoadingResults = signal(true);
  tasksService = inject(KanbanService);

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults.set(true);
        return this.tasksService.searchTasks$();
      })
    ).subscribe((result) => {
      this.dataSource.set(result.items);
      this.totalCount.set(result.totalCount);
      this.isLoadingResults.set(false);
    });
  }
}