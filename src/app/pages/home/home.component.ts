import { Component } from '@angular/core';

import { PinCodeComponent } from '../../components/pin-code/pin-code.component';

@Component({
  selector: 'app-home',
  imports: [PinCodeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
