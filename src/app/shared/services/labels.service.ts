import { Injectable } from "@angular/core";
import { CreateLabel, Label, UpdateLabel } from "../models/task.model";
import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class LabelsService {
  private apiUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  getLabels$() {
    return this.http.get<Label[]>(`${this.apiUrl}/labels`);
  }

  createLabel$(label: CreateLabel) {
    return this.http.post<Label>(`${this.apiUrl}/labels`, label);
  }

  deleteLabel$(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/labels/${id}`);
  }

  updateLabel$(label: UpdateLabel) {
    return this.http.put<Label>(`${this.apiUrl}/labels/${label.id}`, label);
  }
}