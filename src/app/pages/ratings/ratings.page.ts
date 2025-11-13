/*
  RATINGS.PAGE.TS (Lógica de Calificaciones)

  Este componente maneja el formulario de "Calificaciones".
  1. Graba audio REAL usando MediaRecorder (solo en el frontend).
  2. Permite la pre-reproducción de ese audio.
  3. Guarda SOLO el texto (escenario, estrellas, comentario) en Cloud Firestore.
*/
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// 1. IMPORTA LAS HERRAMIENTAS DE FIRESTORE Y DOMSANITIZER
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // Para URLs seguras

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButtons, IonMenuButton]
})
export class RatingsPage implements OnInit {

  ratingForm!: FormGroup; 
  scenarios: string[] = [
   'ANOR LONDO',
   'MAJULA',
   'PARROQUIA DE LOS NO MUERTOS',
   'BOSQUE DE LOS GIGANTES'
  ];

  // Lógica de calificación por estrellas
  maxStars: number = 5;
  currentRating: number = 0;
  hoverRating: number = 0;

  isRecording: boolean = false;
  hasRecording: boolean = false; // Para saber si mostrar el reproductor
  audioUrl: SafeUrl | null = null; // URL segura para el reproductor <audio>
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioStream: MediaStream | null = null; // Para poder apagar el micrófono
  // ---------------------------------------------

  // Propiedades para la imagen (simulado)
  selectedFileName: string = 'Ningún archivo seleccionado';
  
  // 2. INYECTA 'Firestore' Y EL 'Sanitizer'
  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef // Herramienta de Angular para URLs seguras
  ) {}

  ngOnInit(): void {
    // Inicialización del formulario reactivo 
    this.ratingForm = this.fb.group({
      scenario: [this.scenarios[0], Validators.required],
      rating: [null, Validators.required], 
      comment: ['', [Validators.required, Validators.minLength(10)]],
      imageFile: [null],// Este campo ya no lo usaremos para guardar
      audioFile: [null] // Este campo ya no lo usaremos para guardar
    });
  }

  // --- LÓGICA INTERACTIVA DE ESTRELLAS ---

  setRating(rating: number) {
    this.currentRating = rating;
    this.ratingForm.get('rating')?.setValue(rating);
  }

  starEnter(rating: number) {
    this.hoverRating = rating;
  }

  starLeave() {
    this.hoverRating = 0;
  }

  getStarColor(star: number): string {
    const activeRating = this.hoverRating || this.currentRating;
    return star <= activeRating ? '#ffc72c' : '#4a4a58'; 
  }
  
  // --- MANEJO DE ARCHIVOS (Imagen - Simulado) ---
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.ratingForm.get('imageFile')?.setValue(file);
    } else {
      this.selectedFileName = 'Ningún archivo seleccionado';
      this.ratingForm.get('imageFile')?.setValue(null);
    }
  }

  // --- 3. LÓGICA DE AUDIO  ---
  async toggleRecording() {
    if (this.isRecording) {
      // --- DETENER GRABACIÓN ---
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
      // Apaga el micrófono 
      if (this.audioStream) {
        this.audioStream.getTracks().forEach(track => track.stop());
      }
      
    } else {
      // --- INICIAR GRABACIÓN ---
      try {
        // Pide permiso al usuario para el micrófono
        this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(this.audioStream);
        
        // Reinicia variables
        this.audioChunks = [];
        this.audioUrl = null;
        this.hasRecording = false;
        this.isRecording = true;

        // "Escucha" los pedazos de audio y los guarda
        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data);
        };

        // Cuando la grabación se detiene, junta los pedazos
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          // Usamos el 'Sanitizer' para decirle a Angular que esta URL es segura
          this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(url);
          this.hasRecording = true;
          this.cdr.detectChanges(); // Muestra el reproductor
        };
        
        // Empieza a grabar
        this.mediaRecorder.start();

      } catch (e) {
        console.error('Error al iniciar la grabación:', e);
        alert('No se pudo iniciar la grabación. ¿Diste permiso para el micrófono?');
      }
    }
  }

  // --- 4. ENVÍO DEL FORMULARIO (Guardando solo texto, no audio ni img debido al costo de google cloud facturation) ---
  async onSubmit() {
    // 1. Validar el formulario
    if (!this.ratingForm.valid) {
      alert('Por favor, completa todos los campos requeridos (estrellas y comentario).');
      this.ratingForm.markAllAsTouched();
      return;
    }

    // 2. Preparar SOLO los datos de texto
    const ratingData = {
      scenario: this.ratingForm.value.scenario,
      rating: this.ratingForm.value.rating,
      comment: this.ratingForm.value.comment,
      timestamp: new Date()
      // ¡No incluimos 'audioFile' ni 'imageFile'!
    };

    try {
      // 3. Guardar en Firebase
      const ratingsCollection = collection(this.firestore, 'ratings');
      await addDoc(ratingsCollection, ratingData);

      alert('¡Gracias por tu calificación!');
      this.resetForm(); // Llama a la función de reseteo

    } catch (e) {
      // 5. Manejo de error
      console.error('Error al guardar la calificación:', e);
      alert('Hubo un error al enviar tu calificación. Intenta de nuevo.');
    }
  }

  // 5. FUNCIÓN DE RESETEO 
  private resetForm() {
    this.ratingForm.reset({ 
      scenario: this.scenarios[0], 
      rating: null, 
      comment: '', 
      imageFile: null, 
      audioFile: null 
    });
    // Resetea las variables de estado
    this.currentRating = 0;
    this.selectedFileName = 'Ningún archivo seleccionado';
    this.audioUrl = null;
    this.hasRecording = false;
    this.isRecording = false;
  }
}