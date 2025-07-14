import day from "dayjs";

const transformIsoDateToReadableDate = (isoDate:string) => {
    const currentDate = day().startOf('day');
    const inputDate = day(isoDate).startOf('day');
    if (isoDate === "2025-03-20T12:30:00.000Z")
    console.log(currentDate.diff(inputDate, 'days'));
    

    if (currentDate.diff(inputDate, 'days') === 0) {
      return 'Today';
    } else if (currentDate.diff(inputDate, 'days') === 1) {
      return 'Yesterday';
    } else if (currentDate.diff(inputDate, 'days') === -1) {
        return 'Tomorrow';
    } else if (currentDate.diff(inputDate, 'days')  >= -7 && currentDate.diff(inputDate, 'days')  <= 7) {
      return inputDate.format('dddd');
    } else {
      return inputDate.format('YYYY-MM-DD');
    }
}

const transformIsoDateToReadableTime = (isoDate:string) => {
    return day(isoDate).format("h:mm A");
}
const transformIsoDateToReadable = (isoDate:string) => {
    return `${transformIsoDateToReadableDate(isoDate)} ${transformIsoDateToReadableTime(isoDate)}`
}

export {transformIsoDateToReadable}