import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TurntableComponent } from './components/turntable/turntable.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecordBinNavComponent } from './components/record-bin-nav/record-bin-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TurntableComponent, RecordBinNavComponent, FooterComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.scss"
})
export class App {}

