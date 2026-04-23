import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button';
import { TextFieldComponent } from '../../components/text-field/text-field';
import { DropdownComponent } from '../../components/dropdown/dropdown';
import { Select } from '../../components/select/select';
import { Badge } from '../../components/badge/badge';

@Component({
  selector: 'app-components',
  imports: [ButtonComponent, TextFieldComponent, DropdownComponent, Select, Badge],
  templateUrl: './components.html',
  styleUrl: './components.css',
})
export class Components {}
