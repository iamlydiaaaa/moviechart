import { rawReleaseDate } from './types';

class releaseDate {
    date: Date;
    location: string;

    constructor(rawDate: rawReleaseDate) {
        this.date = new Date(rawDate.date);
        this.location = rawDate.location;
    }
}

export default releaseDate;