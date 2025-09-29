import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LabelsService {
  private labels = [
    { id: 'l1', name: 'Setup', color: '#2196f3', createdAt: new Date(), updatedAt: null },
    { id: 'l2', name: 'Design', color: '#e91e63', createdAt: new Date(), updatedAt: null },
    { id: 'l3', name: 'Testing', color: '#4caf50', createdAt: new Date(), updatedAt: null },
    { id: 'l4', name: 'Bug', color: '#f44336', createdAt: new Date(), updatedAt: null },
    { id: 'l5', name: 'Feature', color: '#ff9800', createdAt: new Date(), updatedAt: null },
  ];

  getLabels() {
    return of(this.labels).pipe(delay(500)); // Simulate async operation
  }
}