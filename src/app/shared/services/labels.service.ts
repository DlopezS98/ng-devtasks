import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";
import { Label } from "../models/task.model";
import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class LabelsService {
  private apiUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  getLabels() {
    return this.http.get<Label[]>(`${this.apiUrl}/labels`);
  }
}