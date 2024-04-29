import {AfterViewInit, Component, Inject, Input, OnChanges, OnInit, SimpleChanges, viewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../DBConnection/user.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProfileService} from '../DBConnection/profile.service';
import {User} from '../navbar/navbar.component';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {PersonalInfoService} from '../DBConnection/personal-info.service';
import {MatSelect, MatOption} from '@angular/material/select';
import {CourseService} from '../DBConnection/course.service';
import {UserCourseService} from '../DBConnection/user-course.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlider} from '@angular/material/slider';
import {ChangeDetectorRef} from '@angular/core';
import {ViewChild} from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';


interface PersonalInfo {
  id: number;
  bio: string;
  smoking: number;
  age: number;
  vegan: number;
  location: string;
  Gender: number;
  drinking: number;
}

interface University {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
  universityId: number;
}

interface UserCourse {
  id: number;
  universityId: number;
  courseId: number;
}


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelect, MatOption,
    MatSlideToggleModule,
    MatSliderModule,
    MatSlider],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  userId: string;
  username: string;
  dateCreated: string = '';
  isLoading: boolean = false;
  myprofile: boolean = false;
  isEditBioModalOpen: boolean = false;
  isEditAgeMode: boolean = false;
  isEditLifestyleMode: boolean = false;
  isEditLocationMode: boolean = false;
  isEditProfilePicMode: boolean = false;
  profilePicExists: boolean = false;
  protected minAge = 18;
  protected maxAge = 120;
  selectedFile: File | null = null;


  public userIdFromHomePage: number = 0;

  @Input() userProfile: User | null = null;
  personalInfo: PersonalInfo | null = null;
  university: University | null = null;
  course: Course | null = null;
  userCourse: UserCourse | null = null;
  Gender: string = '';
  urlBool: boolean = true;
  isReportModalOpen: boolean = false;

  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private profileService: ProfileService,
    private router: Router,
    private personalInfoService: PersonalInfoService,
    private courseService: CourseService,
    private userCourseService: UserCourseService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.userId = '';
    this.username = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userId = this.userProfile!.userId.toString();
    this.loadProfileData(this.userId);
  }


  //TODO: Matching api connection
  onClickLike(): void {

  }

    onClickDislike(): void {

    }

    checkUrl(id: number): boolean {
      return (this.document.location.pathname.includes("/profile")  && id != +this.cookieService.get('UID'));
    }


    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {

        const routeUserId = params.get('id');
        console.log('JFAhdusf',routeUserId);       // Getting the user id from the route parameter
        this.userId = routeUserId ? routeUserId : (this.userProfile!.userId.toString());
        console.log(this.document.location.pathname);
        console.log(this.userId);
        console.log(this.urlBool);
        this.urlBool = this.checkUrl(+this.userId);
        console.log(this.urlBool);
        this.isLoading = true;
        this.myprofile = this.userId === this.cookieService.get('UID') || this.cookieService.get('isAdmin') === '1';

        if (this.myprofile) {
          console.log("Viewing YOUR profile");
          this.snackBar.open('Viewing your profile', 'Close', {
            duration: 2000,
            verticalPosition:
            'bottom' });
          } else {
            this.snackBar.open(`Viewing profile with userid: ${this.userId}`, 'Close', {
              duration: 2000,
              verticalPosition:
              'bottom' });
            }

            this.loadProfileData(this.userId);
          });
        }



        loadProfileData(userId: string): void {
          console.log('loading data for userid ' + this.userId)
          this.profileService.getProfileInfo(userId).subscribe({
            next: (response: any) => {
              if (response.user && response.user.length) {
                this.isLoading = true;
                this.checkProfilePicExists()
                this.userProfile = response.user[0];
                console.log('loading data for userid ' + this.userId)
                this.personalInfo = response.personalInfo[0];
                console.log(this.personalInfo);
                this.university = response.university[0];
                this.course = response.course[0];
                this.userCourse = response.userCourse[0];
                this.isLoading = false;
              }
            },
            error: (error) => {
              this.snackBar.open('Failed to load data', 'Close', {
                duration: 3000,
              });
              console.error('There was an error!', error);
            }
          });
        }

        onFileSelected(event: any): void {
          const file = event.target.files[0];
        
          if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {

              // creating an image element
              const image = new Image();
              image.onload = () => {
                const canvas = document.createElement('canvas');
                const imagecontext = canvas.getContext('2d');
                const MAX_WIDTH = 412;
                const MAX_HEIGHT = 412;
                
                // getting original dimensions
                let width = image.width;
                let height = image.height;
      
                // if the image is wider than it is tall
                if (width > height) {
                    // if the width is greater than the maximum allowed width
                  if (width > MAX_WIDTH) {
                    // scaling the image down by the same factor width is being scaled down
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                  }
                } else {
                  if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                  }
                }
        
                if (imagecontext) {
                  canvas.width = width;
                  canvas.height = height;
                  imagecontext.drawImage(image, 0, 0, width, height);

                  // converting to jpeg
                  const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                  const resizedImage = this.dataURItoBlob(dataUrl);
                  this.selectedFile = new File([resizedImage], file.name, { type: 'image/jpeg' });
                }
              };
              image.src = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        }
        
        dataURItoBlob(dataURI: string) {
          const byteString = window.atob(dataURI.split(',')[1]);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const int8Array = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([int8Array], { type: 'image/jpeg' });    
          return blob;
        }

        editBio() {
          this.toggleEditBioModal();
          this.snackBar.open('Editing your bio', 'Close', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
        }

        editLocation() {
          this.toggleEditLocationMode();
          this.snackBar.open('Editing your location', 'Close', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
        }

        editAge() {
          this.toggleEditAgeMode();
          this.snackBar.open('Editing your age', 'Close', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
        }

        editProfilePic() {
          this.isEditProfilePicMode = !this.isEditProfilePicMode;
          this.snackBar.open('Editing your profile picture', 'Close', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
        }

        updateAgeDisplay(newAge: number): void {
          if (this.personalInfo) {
            this.personalInfo.age = newAge;
            console.log('age is: ' + this.personalInfo.age);
            this.loadProfileData(this.userId);
          }
        }

        toggleReportModal() {
          this.isReportModalOpen = !this.isReportModalOpen;
        }

        isLoggedInProfile(): boolean {
          return this.userId !== this.cookieService.get('UID');
        }

        toggleEditBioModal() {
          this.isEditBioModalOpen = !this.isEditBioModalOpen;
          this.loadProfileData(this.userId);
        }

        toggleEditProfilePicMode(): void {
          this.isEditProfilePicMode = !this.isEditProfilePicMode;
        }

        toggleEditLocationMode() {
          this.isEditLocationMode = !this.isEditLocationMode;
          this.loadProfileData(this.userId);
        }

        toggleEditAgeMode() {
          this.isEditAgeMode = !this.isEditAgeMode;
          this.loadProfileData(this.userId);

        }

        toggleEditLifestyleMode() {
          this.isEditLifestyleMode = !this.isEditLifestyleMode;
        }

        updateLifestyle(lifestyle: string, value: boolean) {
          console.log(`The new value for ${lifestyle} is ${value}`);
          if (lifestyle === 'smoking') {
            this.personalInfoService.updateSmoking(this.personalInfo!.id, value ? 1 : 0).subscribe({
              next: () => {
                this.snackBar.open('Smoking status updated successfully', 'Close', { duration: 2000 });
                this.loadProfileData(this.userId);
              },
              error: (error) => {
                console.error('Failed to update smoking status', error);
                this.toggleEditLifestyleMode();
              }
            });
          } else if (lifestyle === 'vegan') {
            this.personalInfoService.updateVegan(this.personalInfo!.id, value ? 1 : 0).subscribe({
              next: () => {
                this.snackBar.open('Vegan status updated successfully', 'Close', { duration: 2000 });
                this.loadProfileData(this.userId);

              },
              error: (error) => {
                console.error('Failed to update vegan status', error);
                this.toggleEditLifestyleMode();
              }
            });
          } else if (lifestyle === 'drinking') {
            this.personalInfoService.updateDrinking(this.personalInfo!.id, value ? 1 : 0).subscribe({
              next: () => {
                this.snackBar.open('Drinking status updated successfully', 'Close', { duration: 2000 });
                this.loadProfileData(this.userId);
              },
              error: (error) => {
                console.error('Failed to update drinking status', error);
                this.toggleEditLifestyleMode();
              }
            });
          }
        }

        uploadProfilePicture(): void {
          if (!this.selectedFile) {
            this.snackBar.open('No file selected!', 'Close', { duration: 2000 });
            return;
          }

          const formData = new FormData();
          formData.append('file', this.selectedFile, this.selectedFile.name);
          const file = formData.get('file') as File;

          console.log(file);
          this.userService.updateProfilePicture(+this.userId, file);

          setTimeout(() => {
            this.snackBar.open('Profile picture updated successfully', 'Close', { duration: 2000 });
            this.loadProfileData(this.userId);
            this.toggleEditProfilePicMode();
          }, 1000); // 1000 milliseconds = 1 second
        }

        checkProfilePicExists() {
          this.userService.getById(this.userId).subscribe({
            next: (response: any) => {
              if (response && response.length > 0 && response[0].profilePicture) {
                response[0].profilePicture = response[0].profilePicture;
                this.profilePicExists = true;
                console.log('Profile picture is set.');
              } else {
                this.profilePicExists = false;
                console.log('No profile picture found, using default.');
              }
            },
            error: (error) => {
              console.error('Failed to check if profile pic exists', error);
            }
          });
        }

        saveBio() {
          if (this.personalInfo && this.personalInfo.bio) {
            this.personalInfoService.updateBio(this.personalInfo.id, this.personalInfo.bio).subscribe({
              next: () => {
                this.snackBar.open('Bio updated successfully', 'Close', { duration: 2000 });
                this.toggleEditBioModal();

              },
              error: (error) => {
                console.error('Failed to update bio', error);
                this.toggleEditBioModal();
              }
            });
          } else {
            this.snackBar.open('No changes to save', 'Close', { duration: 2000 });
          }
        }

        saveLocation() {
          if (this.personalInfo && this.personalInfo.location) {
            this.personalInfoService.updateLocation(this.personalInfo.id, this.personalInfo.location).subscribe({
              next: () => {
                this.snackBar.open('Location updated successfully', 'Close', { duration: 2000 });
                this.toggleEditLocationMode();
              },
              error: (error) => {
                console.error('Failed to update location', error);
                this.toggleEditLocationMode();
              }
            });
          } else {
            this.snackBar.open('No changes to save', 'Close', { duration: 2000 });
          }
        }

        saveAge() {
          if (this.personalInfo && this.personalInfo.age) {
            this.personalInfoService.updateAge(this.personalInfo.id, this.personalInfo.age).subscribe({
              next: () => {
                this.snackBar.open('Age updated successfully', 'Close', { duration: 2000 });
                this.toggleEditAgeMode();
              },
              error: (error) => {
                console.error('Failed to update age', error);
                this.toggleEditAgeMode();
              }
            });
          } else {
            this.snackBar.open('No changes to save', 'Close', { duration: 2000 });
          }
        }

        validateAge(event: any) {
          const value = event.target.value;
          event.target.value = value.replace(/[^0-9]/g, '');
          this.snackBar.open('Please enter a valid age', 'Close', { duration: 2000 });
        }

        getLifestyleIcons(): string {
          let icons = '';

          if (this.personalInfo?.smoking === 1) {
            icons += '<i class="fas fa-smoking"></i> ';
          }
          if (this.personalInfo?.drinking === 1) {
            icons += '<i class="fas fa-beer"></i> ';
          }
          if (this.personalInfo?.vegan === 1) {
            icons += '<i class="fa-solid fa-leaf"></i> ';
          }

          return icons;
        }



      }

