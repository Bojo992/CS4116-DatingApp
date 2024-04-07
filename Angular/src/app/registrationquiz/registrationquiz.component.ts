import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router'; 


  // ! Enum is used to cycle pages
enum ModalPage{
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7
}

@Component({
  selector: 'app-registrationquiz',
  standalone: true,
  imports: [NgIf, FormsModule, MatTooltipModule], // ! FORMS MODULE IS USED HERE TO TRACK THE USERS FORM RESPONSES
  templateUrl: './registrationquiz.component.html',
  styleUrl: './registrationquiz.component.css'
})


export class RegistrationquizComponent {
  currentModalPage: ModalPage = ModalPage.Page1;
  selectedSubject: string | null = null;
  selectedLearningStyle: string | null = null;
  selectedAspiration: string | null = null;
  selectedCourseLoad : string | null = null;
  selectedCourseSize : string | null = null;
  selectedExtraCurricular : string | null = null;

  constructor(private router: Router) {}


  switchPage(page:ModalPage){
    this.currentModalPage = page;
  }

  goToNextPage() {
    // ! Check for the current page and decide if it's ok to proceed to the next page
    if ((this.currentModalPage === ModalPage.Page2 && this.selectedSubject) ||
    (this.currentModalPage === ModalPage.Page3 && this.selectedLearningStyle ||
      this.currentModalPage === ModalPage.Page4 && this.selectedLearningStyle ||
      this.currentModalPage === ModalPage.Page5 && this.selectedCourseLoad ||
      this.currentModalPage === ModalPage.Page6 && this.selectedCourseLoad ||
      this.currentModalPage === ModalPage.Page7 && this.selectedExtraCurricular
    ))
    {
      // ! Logic to move to the next page
      const nextPage = this.currentModalPage + 1;
      const isNextPageExist = nextPage in ModalPage;
      if (isNextPageExist) {
        this.switchPage(nextPage);
      }
    }
  }

  goToPreviousPage(){
    if ((this.currentModalPage === ModalPage.Page2) ||
    (this.currentModalPage === ModalPage.Page3  ||
      this.currentModalPage === ModalPage.Page4  ||
      this.currentModalPage === ModalPage.Page5  ||
      this.currentModalPage === ModalPage.Page6  ||
      this.currentModalPage === ModalPage.Page7
    ))
    {
      const prevPage = this.currentModalPage-1;
      const isPrevPageExist = prevPage in ModalPage;

      if(isPrevPageExist){
        this.switchPage(prevPage);
      }
    }
  }

  finishQuiz() {
    if (this.selectedExtraCurricular) {
      this.router.navigate(['/home']);
    }
  }


  ModalPage = ModalPage;

}
