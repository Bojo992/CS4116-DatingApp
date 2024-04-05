import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationquizComponent } from './registrationquiz.component';

describe('RegistrationquizComponent', () => {
  let component: RegistrationquizComponent;
  let fixture: ComponentFixture<RegistrationquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationquizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
