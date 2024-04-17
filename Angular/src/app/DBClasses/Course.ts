export class Course {
  public id : number;
  public name : string;
  public universityId : number;

  constructor() {
    this.id = 0;
    this.universityId = 0;
    this.name = "";
  }

  public static parse(input: any): Course {
    let result = new Course();

    result.id = input.id;
    result.universityId = input.universityId;
    result.name = input.name;

    return result;
  }
}
