import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactPage } from './contact.page';

import { Firestore } from '@angular/fire/firestore';
import { provideIonicAngular } from '@ionic/angular/standalone';

describe('ContactPage', () => {
  let component: ContactPage;
  let fixture: ComponentFixture<ContactPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPage],
      
      providers: [
        provideIonicAngular(), 
        
        { provide: Firestore, useValue: {} } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});