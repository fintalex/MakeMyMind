export class User {
    _id: string;
    username: string;
    password: string;
    nickname: string;
    locale: string;
    showHelpers: boolean;
    helper:  { 
        calendarMainHelp:  boolean,
        categoryMainHelp:  boolean,
        frendsMainHelp:  boolean,
        brickTypeMainHelp:  boolean,
        wallSideNavShow: boolean
    }
}