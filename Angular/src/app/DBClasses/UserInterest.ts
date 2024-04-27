export class UserInterest {
  university : number = 0;
  course : number = 0;
  gender : number = 0;
  drinking : number = 0;
  smoking : number = 0;
  vegan : number = 0;
  max_age : number = 0;
  min_age : number = 0;

  constructor() {
  }

  public static parse(input: any): UserInterest {
    let result = new UserInterest();

    for(let interest of input) {
      switch (interest.typeId) {
        case 1:
          result.university = interest.value;
          break;
        case 2:
          result.course = interest.value;
          break;
        case 3:
          result.gender = interest.value;
          break;
        case 4:
          result.drinking = interest.value;
          break;
        case 5:
          result.smoking = interest.value;
          break;
        case 6:
          result.vegan = interest.value;
          break;
        case 7:
          result.max_age = interest.value;
          break;
        case 8:
          result.min_age = interest.value;
          break;
      }
    }

    return result;
  }
}
