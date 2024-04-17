export class University {
  public id : number;
  public name : string;

  constructor() {
    this.id = 0;
    this.name = "";
  }

  public static parse(input: any): University {
    let result = new University();

    result.id = input.id;
    result.name = input.name;

    return result;
  }
}
