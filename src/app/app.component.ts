import { Component } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminComponent } from "../components/admin/admin.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    NavigationComponent,
    RouterOutlet,
    RouterModule,
    AdminComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin-panel';
}
