export class ResortSimple {
  public id: number;
  public name: string;
}

export class Resort {
  public id: number;
  public name: string;
  public website: string;
  public atAGlance: string;
}

export class ResortLevel {
  public id: number;
  public resortId: number;
  public level: number;
  public description: string;
}
