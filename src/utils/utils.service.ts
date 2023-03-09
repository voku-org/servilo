import { Injectable } from '@nestjs/common'

@Injectable()
export class UtilsService {
  constructor(){}

  public calculateAge(birthday: string): number {
    let birhtDate: Date = new Date(birthday);
    let today: Date = new Date();
    let age: number = today.getFullYear() - birhtDate.getFullYear();
    let monthDifference: number = today.getMonth() - birhtDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate())) {
      age--;
    }
    return age;
  };
}