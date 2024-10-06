import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  public myForm: FormGroup = this.fb.group({
    username: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required, Validators.minLength(6) ]],
  })

  register() {
    const { username, password} = this.myForm.value;
    console.log({username, password});

    this.authService.register(username, password).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }

}
