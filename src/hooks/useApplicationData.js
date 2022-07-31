import { useState, useEffect, useReducer } from 'react';
import axios from "axios";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      case SET_INTERVIEW: {
        return { ...state, days: action.days, appointments: action.appointments }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const setDay = day => dispatch({ type: SET_DAY, day });

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
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    })
  }, []);

  /**
   * This function count number of null interviews in a given array of appointments 
   * @param {*} appointmentsArray array of appointments for a specific day 
   * @param {*} appointments all appointmnets object
   * @returns Number of null interviews
   */
  function countNullInterviews(appointmentsArray, appointments) {
    let nullInterviews = 0;
    for (const id of appointmentsArray) {
      if (appointments[id].interview === null) {
        nullInterviews += 1;
      }
    }
    return nullInterviews;
  }

  /**
   * This funtion returns days objects with updated spots remaining 
   * @param {*} appointments Object containing all appointments
   * @returns Object days
   */
  function updateSpots(appointments) {
    const presentDay = state.day;
    let requiredDay = state.days.filter((currDay) => currDay.name === presentDay);
    const appointmentsForPresentDay = requiredDay[0].appointments;
    const availableSpots = countNullInterviews(appointmentsForPresentDay, appointments);
    const days = [...state.days];
    days[requiredDay[0].id - 1].spots = availableSpots;
    return days;
  }

  /**
   * Given id of appointment and interview object, this function book an interview by calling remote api and update state locally
   */
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

        dispatch({ type: SET_INTERVIEW, days, appointments });
      });
  }

  /**
   * Given id of appointment, this function deletes interview by calling remote api and update state locally
   */
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
        dispatch({ type: SET_INTERVIEW, days, appointments });
      });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
} 