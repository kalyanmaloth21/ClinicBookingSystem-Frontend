import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  // fallback local data when backend is unreachable
  private localTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', completed: true },
    { id: 3, title: 'Task 3', description: 'Description 3', completed: false },
    { id: 4, title: 'Task 4', description: 'Description 4', completed: true },
  ];

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('TaskService.getTasks() failed, returning local tasks', err);
        return of(this.localTasks);
      })
    );
  }

  getTask(id: number): Observable<Task | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      catchError(err => {
        console.error(`TaskService.getTask(${id}) failed, searching local tasks`, err);
        const found = this.localTasks.find(t => t.id === id);
        return of(found);
      })
    );
  }
}