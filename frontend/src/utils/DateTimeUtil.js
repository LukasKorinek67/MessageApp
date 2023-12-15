import * as strings from "../strings/strings"
class DateTimeUtil {
    getTime() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const time = hours + ':' + minutes;
        return time;
    }

    getDateTime() {
        return new Date();
    }

    getTimeFromDate(date) {
        const dateObject = new Date(date);
        const hours = dateObject.getHours().toString().padStart(2, "0");
        const minutes = dateObject.getMinutes().toString().padStart(2, "0");
        const time = hours + ':' + minutes;
        return time;
    }

    getDateAndTimeString(date) {
        const dateObject = new Date(date);
        const dateString = this.getStringDate(dateObject);
        const timeString = this.getTimeFromDate(dateObject);
        return dateString + " " + timeString;
    }

    getChatPreviewTime(date) {
        const dateObject = new Date(date);
        if (this.isDateToday(dateObject)) {
            const time = this.getTimeFromDate(dateObject);
            return time;
        } else if(this.isDateYesterday(dateObject)) {
            return strings.DAYS_IN_WEEK_YESTERDAY;
        } else if(!this.isDateToday(dateObject) && this.isDateWeekBack(dateObject)) {
            const dayInWeek = this.getDayInWeek(dateObject);
            return dayInWeek;
        }
        else {
            const stringDate = this.getStringDate(dateObject);
            return stringDate;
        }
    }

    isDateToday(date) {
        const today = new Date();
        const isToday =
            today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === date.getDate();
        return isToday;
    }

    isDateYesterday(date) {
        const today = new Date();
        const isYesterday =
            today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === (date.getDate() + 1);
        if(isYesterday) {
            return isYesterday;
        } else {
            // pokud byl včera jiný měsíc nebo rok, tak ještě zkusím přes rozdíl
            const dateTime = date.getTime();
            const todayTime = today.getTime();
            const timeDifference = todayTime - dateTime;
            if (timeDifference < 0) {
                // datum "z budoucnosti"
                return false;
            }
            const DayInMilliseconds = 1 * 24 * 60 * 60 * 1000;
            const isLessThanDay = (timeDifference < DayInMilliseconds && timeDifference >= 0);
            return isLessThanDay;
        }
    }

    isDateWeekBack(date) {
        const today = new Date();
        const dateTime = date.getTime();
        const todayTime = today.getTime();
        const timeDifference = todayTime - dateTime;
        if(timeDifference < 0) {
            // datum "z budoucnosti"
            return false;
        }
        // jen 6 dní protože nechci ukazovat "neděle" když už je znova neděle - mohlo by být matoucí
        const sixDaysInMilliseconds = 6 * 24 * 60 * 60 * 1000;
        const isLessThanWeekBack = (timeDifference < sixDaysInMilliseconds && timeDifference >= 0);
        return isLessThanWeekBack;
    }

    getDayInWeek(date) {
        const numberOfDayInWeek = date.getDay();
        switch(numberOfDayInWeek) {
            case 0:
                return strings.DAYS_IN_WEEK_SUNDAY;
            case 1:
                return strings.DAYS_IN_WEEK_MONDAY;
            case 2:
                return strings.DAYS_IN_WEEK_TUESDAY;
            case 3:
                return strings.DAYS_IN_WEEK_WEDNESDAY;
            case 4:
                return strings.DAYS_IN_WEEK_THURSDAY;
            case 5:
                return strings.DAYS_IN_WEEK_FRIDAY;
            case 6:
                return strings.DAYS_IN_WEEK_SATURDAY;
            default:
                return this.getStringDate(date);
        }
    }

    getStringDate(date) {
        const day = date.getDate().toString().padStart(2, "0");
        const monthNumber = (date.getMonth() + 1)
        const month = monthNumber.toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        const stringDate = day + "." + month + "." + year;
        return stringDate
    }
}

const dateTimeService = new DateTimeUtil();
export default dateTimeService;