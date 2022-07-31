/**
 * This function gets ids of appointments for a given day from state.days and then return array of appointment objects from state.appointments 
 * @param {*} state 
 * @param {*} day 
 * @returns return array of appointment object for given day
 */

export function getAppointmentsForDay(state, day) {
  let appointmentsForGivenDay = [];
  let requiredDay = state.days.filter((currDay) => currDay.name === day);
  if (requiredDay.length > 0) {
    let appointmentIDs = requiredDay[0].appointments;
    for (let id of appointmentIDs) {
      appointmentsForGivenDay.push(state.appointments[id]);
    }
  }

  return appointmentsForGivenDay;
}

/**
 * The function return a new object containing the interview data when we pass it an object that contains the interviewer. 
 * Otherwise, the function return null.
 * @param {*} state 
 * @param {*} interview 
 * @returns object containing interview data
 */
export function getInterview(state, interview) {
  if (!(interview)) return null;

  const updatedInterviewObject = {
    ...interview,
    "interviewer": state.interviewers[interview.interviewer]
  };

  return updatedInterviewObject;
}

/**
 * This function gets ids of interviewers for a given day from state.days and then return array of interviewer objects from state.interviewers 
 * @param {*} state 
 * @param {*} day 
 * @returns array of interviewer objects with detailed information of interviewers
 */
export function getInterviewersForDay(state, day) {
  let interviewersForGivenDay = [];
  let requiredDay = state.days.filter((currDay) => currDay.name === day);
  if (requiredDay.length > 0) {
    let interviewersIDs = requiredDay[0].interviewers;
    for (let id of interviewersIDs) {
      interviewersForGivenDay.push(state.interviewers[id]);
    }
  }

  return interviewersForGivenDay;
}

