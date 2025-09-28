import { Injectable } from '@angular/core';
import { TaskResponseDto, TaskStatus } from '../models/task.model';


@Injectable({ providedIn: 'root' })
export class KanbanService {
  private tasks: TaskResponseDto[] = [
    {
      id: '1',
      title: 'Setup project',
      description: 'Initialize Angular workspace and install dependencies.',
      status: TaskStatus.ToDo,
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
      status: TaskStatus.InProgress,
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
      status: TaskStatus.Draft,
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
      status: TaskStatus.Done,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: new Date(),
      labels: [
        { id: 'l3', name: 'Testing', color: '#4caf50', createdAt: new Date(), updatedAt: null }
      ],
      priority: 4
    },
    {
      id: '5',
      title: 'Deployment',
      description: 'Deploy application to production environment.',
      status: TaskStatus.Draft,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
      labels: [
        { id: 'l4', name: 'Deployment', color: '#ff9800', createdAt: new Date(), updatedAt: null }
      ],
      priority: 5
    },
    {
      id: '6',
      title: 'User Feedback',
      description: 'Collect and analyze user feedback post-deployment.',
      status: TaskStatus.Draft,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
      labels: [],
      priority: 6
    },
    {
      id: '7',
      title: 'Bug Fixes',
      description: 'Address bugs reported by users.',
      status: TaskStatus.Draft,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
      labels: [
        { id: 'l5', name: 'Bug', color: '#f44336', createdAt: new Date(), updatedAt: null }
      ],
      priority: 7
    },
    {
      id: '8',
      title: 'Performance Optimization',
      description: 'Improve application performance and load times.',
      status: TaskStatus.Draft,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
      labels: [
        { id: 'l6', name: 'Performance', color: '#9c27b0', createdAt: new Date(), updatedAt: null }
      ],
      priority: 8
    },
    {
      id: '9',
      title: 'Documentation',
      description: 'Create comprehensive documentation for the project.',
      status: TaskStatus.Draft,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
      labels: [
        { id: 'l7', name: 'Docs', color: '#607d8b', createdAt: new Date(), updatedAt: null }
      ],
      priority: 9
    },
    {
      id: '10',
      title: 'Feature Expansion',
      description: 'Plan and implement new features based on user requests.',
      status: TaskStatus.Draft,
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
      labels: [],
      priority: 10
    }
  ];

  getTasks(): TaskResponseDto[] {
    return this.tasks;
  }

  getTasksByStatus(status: TaskStatus): TaskResponseDto[] {
    return this.tasks.filter(task => task.status === status);
  }
}
