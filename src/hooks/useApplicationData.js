import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      console.log("Prmomise response: ", all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

function countNullInterviews(appointmentsArray, appointments) {
  let nullInterviews = 0;
  for (const id of appointmentsArray) {
    if (appointments[id].interview === null) {
      nullInterviews += 1;
    }
  }
  return nullInterviews;
}

  function updateSpots(appointments) {
    const presentDay= state.day;
    let requiredDay = state.days.filter((currDay) => currDay.name === presentDay);
    const appointmentsForPresentDay = requiredDay[0].appointments;
    const availableSpots = countNullInterviews(appointmentsForPresentDay, appointments);
    const days = [...state.days];
    days[requiredDay[0].id - 1].spots = availableSpots;
    return days;
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        console.log("PUT response: ", response);
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
      
        const days = updateSpots(appointments);
        setState({
          ...state,
          days,
          appointments
        });
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        console.log("Response is: ", response);
        const appointment = {
          ...state.appointments[id],
          interview: null
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(appointments);
        setState({
          ...state,
          days,
          appointments
        });
      });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
} 