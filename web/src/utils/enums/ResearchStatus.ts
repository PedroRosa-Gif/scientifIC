import { allStatus } from "../constants/allStatus.constants";

export class ResearchStatusEnum {
  static acceptingStudents = 1;
  static initialStep = 2;
  static underDevelopment = 3;
  static finished = 4;

  static getStatusKey(statusValue: number): string | null {
    for (const key in ResearchStatusEnum) {
      if (ResearchStatusEnum[key as keyof typeof ResearchStatusEnum] === statusValue) {
        return key;
      }
    }
    return null;
  }

  static getStatusValue(statusKey: keyof typeof ResearchStatusEnum): ResearchStatusEnum | null {
    const value = ResearchStatusEnum[statusKey];
    return value !== undefined ? value : null;
  }

  static getStatusString(value: number): string | null {
    return allStatus[value - 1]
  }
}