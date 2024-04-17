export class Profile {
  public bio : string;
  public smoking : boolean;
  public age : number;
  public vegan : boolean;
  public Gender : number;
  public drinking : boolean;
  public course : number;
  public userId : number;
  public dateCreated : Date;
  public isAdmin : boolean;
  public userName : string;
  public userEmail : string;
  public universityId : number;
  public universityName : string;
  public courseName : string;
  public courseId : number;

  constructor() {
    this.bio = '';
    this.smoking = false;
    this.age = 0;
    this.vegan = false;
    this.Gender = 0;
    this.drinking = false;
    this.course = 0;
    this.userId = 0;
    this.dateCreated = new Date();
    this.isAdmin = false;
    this.userName = '';
    this.userEmail = '';
    this.universityId = 0;
    this.universityName = '';
    this.courseName = '';
    this.courseId = 0;
  }

  public static parse(input: any): Profile {
    let result = new Profile();

    result.bio = input.bio;
    result.smoking = input.smoking;
    result.age = input.age;
    result.vegan = input.vegan;
    result.Gender = input.Gender;
    result.drinking = input.drinking;
    result.course = input.course;
    result.userId = input.userId;
    result.dateCreated = input.dateCreated;
    result.isAdmin = input.isAdmin;
    result.userName = input.userName;
    result.userEmail = input.userEmail;
    result.universityId = input.universityId;
    result.universityName = input.universityName;
    result.courseName = input.courseName;
    result.courseId = input.courseId;


    return result;
  }
}
