import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TurntableComponent } from './components/turntable/turntable.component';
import { RecordBinComponentNav } from './components/record-bin-nav/record-bin-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TurntableComponent, RecordBinComponentNav],
  templateUrl: "./app.html",
  styleUrl: "./app.scss"
})
export class App {}
