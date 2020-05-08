import moment from "moment"

export function getDatePassedFromToday(dateStamp) {
  const diffInMinutes = moment().diff(moment(dateStamp, 'DD-MM-YYYY HH:mm:ss'), 'minutes')
  const noOfminutesInADay = 60 * 24
  const noOfMinutesInAWeek = noOfminutesInADay * 7
  if (diffInMinutes === 0) {
    return 'now'
  } else if (diffInMinutes < 1) {
    return `${diffInMinutes * 60}s`
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`
  } else if (diffInMinutes >= 60 && diffInMinutes < noOfminutesInADay) {
    return `${Math.floor(diffInMinutes / 60)}h`
  } else if (diffInMinutes >= noOfminutesInADay && diffInMinutes < noOfMinutesInAWeek) {
    return `${Math.floor((diffInMinutes / 60) / 24)}d`
  } else {
    return `${Math.floor(((diffInMinutes / 60) / 24) / 7)}w`
  }
}
