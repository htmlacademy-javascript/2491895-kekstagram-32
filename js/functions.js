function checkStringLength(string , maxLength) {
  const length = string.length;
  return length <= maxLength;
}

checkStringLength();

function checkPalindrome(string) {
  const normalizedString = string.replaceAll().toLowerCase();
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return reversedString === normalizedString;
}

checkPalindrome();

function checkMeeting(startDay, endkDay, meetingStart, meetingDuration) {
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workStart = timeToMinutes(startDay);
  const workEnd = timeToMinutes(endkDay);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStart && meetingEndMinutes <= workEnd;
}

checkMeeting();
