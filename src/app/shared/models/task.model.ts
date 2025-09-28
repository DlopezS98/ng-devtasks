export interface TaskResponseDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date | null;
  completedAt: Date | null;
  labels: LabelResponseDto[];
  priority: number;
}

export interface LabelResponseDto {
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
