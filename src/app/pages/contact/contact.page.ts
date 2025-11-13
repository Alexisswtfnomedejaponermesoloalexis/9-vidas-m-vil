/*
  CONTACT.PAGE.TS (Lógica de la página de Soporte)

  Este componente maneja el formulario de "Soporte/Contacto".
  Usa Reactive Forms para validar los datos y, al enviarse,
  guarda el reporte en la colección 'bug_reports' de Cloud Firestore.
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
// Importamos las herramientas para crear Formularios Reactivos
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// 1. IMPORTA LAS HERRAMIENTAS DE FIRESTORE
// 'Firestore' es el servicio principal, 'collection' nos ayuda a apuntar a una colección,
// y 'addDoc' nos permite añadir un nuevo documento (el reporte) a esa colección.
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButtons, IonMenuButton]
})
export class ContactPage implements OnInit {

  // 'contactForm' es la variable que "controla" nuestro formulario HTML
  contactForm!: FormGroup;
  // 'isSubmitting' es una bandera para deshabilitar el botón mientras se envía
  isSubmitting: boolean = false; 

  // 2. INYECTA 'Firestore' EN EL CONSTRUCTOR
  constructor(
    private fb: FormBuilder, // 'fb' es una herramienta para construir formularios fácilmente
    private firestore: Firestore // 'firestore' es nuestra conexión a la base de datos
  ) {}

  // 'ngOnInit' se ejecuta una sola vez, cuando la página carga por primera vez.
  ngOnInit(): void {
    // Aquí definimos la estructura del formulario y sus reglas (Validaciones)
    this.contactForm = this.fb.group({
      // El campo 'name' es obligatorio (Validators.required)
      name: ['', Validators.required],
      // El campo 'email' debe ser obligatorio Y tener formato de email
      email: ['', [Validators.required, Validators.email]], 
      // El campo 'problem' debe ser obligatorio Y tener al menos 20 caracteres
      problem: ['', [Validators.required, Validators.minLength(20)]] 
    });
  }

  // 3. CAMBIAMOS EL 'onSubmit' PARA QUE USE FIREBASE
  // Esta función se llama cuando el usuario presiona el botón "Enviar"
  // La hacemos 'async' (asíncrona) para poder usar 'await' (esperar)
  async onSubmit() {
    
    // Primero, revisa si el formulario es válido (según las reglas del ngOnInit)
    if (this.contactForm.valid) {
      this.isSubmitting = true; // Bloquea el botón para evitar doble envío
      const formData = this.contactForm.value; // Obtiene todos los datos del formulario
      
      // 'try...catch' es un bloque de seguridad.
      // Intenta (try) hacer la llamada a Firebase...
      try {
        // Apunta a la colección 'bug_reports' en Firebase (si no existe, la crea)
        const reportsCollection = collection(this.firestore, 'bug_reports');
        
        // Añade los datos del formulario (formData) como un nuevo documento.
        // 'await' pausa la función aquí hasta que Firebase responda.
        await addDoc(reportsCollection, formData);

        // Si 'await' termina sin error, ¡el reporte se guardó con éxito!
        alert(`¡Reporte enviado! Gracias por tu ayuda.`);
        
        // Resetea el formulario a sus valores por defecto (vacíos)
        this.contactForm.reset({
          name: '',
          email: '',
          problem: ''
        });

      } catch (e) {
        // ...pero si 'await' falla (ej. no hay internet), el 'catch' (atrapar)
        // se activa y muestra un error amigable.
        console.error('Error al guardar en Firebase:', e);
        alert('Hubo un error al enviar tu reporte. Por favor, intenta de nuevo.');
      
      } finally {
        // 'finally' se ejecuta siempre (si hubo éxito O error)
        this.isSubmitting = false; // Desbloquea el botón
      }
      
    } else {
      // Si el formulario NO es válido (ej. falta el email), se ejecuta esto
      alert('Por favor, completa correctamente todos los campos marcados.');
      // 'markAllAsTouched' hace que se muestren todos los mensajes de error en el HTML
      this.contactForm.markAllAsTouched();
    }
  }

  // Esta es una función "ayudante" (helper) que usamos en el HTML
  // para verificar si un campo específico (ej. 'name') tiene errores.
  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    // Devuelve 'true' (verdadero) si el campo es inválido Y el usuario ya escribió en él
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}