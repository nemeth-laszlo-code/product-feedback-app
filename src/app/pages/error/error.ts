import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button';

@Component({
  selector: 'app-error',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {}
