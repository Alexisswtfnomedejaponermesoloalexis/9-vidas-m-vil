/*
  CONTACT.PAGE.TS
  Controlador de la página de Soporte.
  Gestiona la validación del formulario y el envío asíncrono de reportes 
  a la base de datos Cloud Firestore.
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButtons, IonMenuButton]
})
export class ContactPage implements OnInit {

  contactForm!: FormGroup;
  isSubmitting: boolean = false; // Controla el estado de carga del botón

  // Inyección de dependencias: Constructor de formularios y servicio de Base de Datos
  constructor(
    private fb: FormBuilder,
    private firestore: Firestore 
  ) {}

  ngOnInit(): void {
    // Inicialización del formulario con reglas de validación estrictas
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      problem: ['', [Validators.required, Validators.minLength(20)]] 
    });
  }

  // Método principal de envío
  async onSubmit() {
    
    // 1. Verifica si el formulario cumple con todas las reglas de validación
    if (this.contactForm.valid) {
      this.isSubmitting = true; // Bloquea el botón para evitar envíos dobles
      const formData = this.contactForm.value;
      
      try {
        // Referencia a la colección 'bug_reports' en Firestore
        const reportsCollection = collection(this.firestore, 'bug_reports');
        
        // Guarda el documento en la nube de forma asíncrona
        await addDoc(reportsCollection, formData);

        // Flujo de éxito: Notifica al usuario y limpia el formulario
        alert(`¡Reporte enviado! Gracias por tu ayuda.`);
        
        this.contactForm.reset({
          name: '',
          email: '',
          problem: ''
        });

      } catch (e) {
        // Flujo de error: Loguea el problema y notifica al usuario
        console.error('Error al guardar en Firebase:', e);
        alert('Hubo un error al enviar tu reporte. Por favor, intenta de nuevo.');
      
      } finally {
        // Se ejecuta siempre: Desbloquea el botón independientemente del resultado
        this.isSubmitting = false; 
      }
      
    } else {
      // Si el formulario es inválido, fuerza la visualización de los errores en la UI
      alert('Por favor, completa correctamente todos los campos marcados.');
      this.contactForm.markAllAsTouched();
    }
  }

  // Helper para verificar el estado de error de un campo específico en el HTML
  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    // Retorna true solo si el campo es inválido Y ha sido tocado por el usuario
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}