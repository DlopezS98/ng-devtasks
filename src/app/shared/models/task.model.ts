export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date | null;
  completedAt: Date | null;
  labels: Label[];
  priority: number;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export enum TaskStatus {
  Draft = "Draft",
  ToDo = "ToDo",
  InProgress = "InProgress",
  Done = "Done",
}
