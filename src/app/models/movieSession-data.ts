export interface MovieSession {
    movieSessionId: number;
    dateOfSession: string;
    timeOfSession: string;
    sessionTypeName: string;
    hallName: string;
    availableSeat: number;
    allSeats: number;
    subtitles: boolean;
  }