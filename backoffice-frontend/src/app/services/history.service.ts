import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  historyUrl: string = 'assets/data/history.json';

  getHistory() {
    return this.http.get(this.historyUrl);
  }
}
