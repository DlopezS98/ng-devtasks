import { Injectable } from '@angular/core';
import { TaskResponseDto, TaskStatuses, LabelResponseDto } from './models/task.model';

@Injectable({ providedIn: 'root' })
export class KanbanService {
  private tasks: TaskResponseDto[] = [
    {
      id: '1',
      title: 'Setup project',
      description: 'Initialize Angular workspace and install dependencies.',
      status: TaskStatuses.ToDo,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
      labels: [
        { id: 'l1', name: 'Setup', color: '#2196f3', createdAt: new Date(), updatedAt: null }
      ],
      priority: 1
    },
    {
      id: '2',
      title: 'Design UI',
      description: 'Create wireframes for Kanban board.',
      status: TaskStatuses.InProgress,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
      labels: [
        { id: 'l2', name: 'Design', color: '#e91e63', createdAt: new Date(), updatedAt: null }
      ],
      priority: 2
    },
    {
      id: '3',
      title: 'Implement board',
      description: 'Develop Kanban board using Angular Material.',
      status: TaskStatuses.Draft,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
      labels: [],
      priority: 3
    },
    {
      id: '4',
      title: 'Testing',
      description: 'Write unit tests for Kanban features.',
      status: TaskStatuses.Done,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: new Date(),
      labels: [
        { id: 'l3', name: 'Testing', color: '#4caf50', createdAt: new Date(), updatedAt: null }
      ],
      priority: 4
    }
  ];

  getTasks(): TaskResponseDto[] {
    return this.tasks;
  }

  getTasksByStatus(status: TaskStatuses): TaskResponseDto[] {
    return this.tasks.filter(task => task.status === status);
  }
}
