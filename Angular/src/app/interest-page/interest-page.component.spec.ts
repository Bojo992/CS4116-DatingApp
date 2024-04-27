import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPageComponent } from './interest-page.component';

describe('InterestPageComponent', () => {
  let component: InterestPageComponent;
  let fixture: ComponentFixture<InterestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
