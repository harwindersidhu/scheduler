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

export function getInterview(state, interview) {
  if (!(interview)) return null;

  const updatedInterviewObject = {
    ...interview,
    "interviewer": state.interviewers[interview.interviewer]
  };

  return updatedInterviewObject;
}

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

