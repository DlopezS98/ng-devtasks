import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task, TaskStatus } from '../models/task.model';
import { PagedResult } from '../models/query.model';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private apiUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  searchTasks$(
    filter: string,
    sort: string,
    sortOrder: 'asc' | 'desc',
    page: number,
    pageSize: number
  ): Observable<PagedResult<Task>> {
    const url = `${this.apiUrl}/tasks?sort=${sort}:${sortOrder}&page=${page}&pageSize=${pageSize}`;
    if (!filter) {
      url.concat(`&filter=title:eq:${filter}`);
    }

    return this.http.get<PagedResult<Task>>(url);
  }

  getTasksByStatus$(status: TaskStatus): Observable<Task[]> {
    const url = `${this.apiUrl}/tasks?filter=status:eq:${status}&page=1&pageSize=100&sort=createdAt:desc`;
    return this.http.get<PagedResult<Task>>(url).pipe(
      map((result) => result.items),
      catchError((error) => {
        return of([]);
      })
    );
  }
}
