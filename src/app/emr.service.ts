import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmrService {

  private baseUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&";

  private promptText = "Convert the following text to json format with fields for Name, Age, Gender, "
    + "Causes, Symptoms, Diagnostics, Treatment, Preventative Measures, and Next Steps"

  private apiKey = "sk-proj-RzShknq91EgR7hS1Mjw0T3BlbkFJKlxCJycmw3dCzilOuZOX";

  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http : HttpClient) { }

  getUrl(symbol: string, interval : string) {
    return this.baseUrl + "symbol=" + symbol + "&interval=" + interval +
      "&apikey=demo";
  }

  getApiResponse() : Observable<any> {
    const url = this.getUrl("IBM", "5min");
    return this.http.get(url);
  }

  generateText(medicalText : string) {
    const headers = new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'Access-Control-Allow-Origin': '*'
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
            role: "system",
            content: this.promptText + " " + medicalText
        }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

}
