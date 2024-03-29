import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log("Error while saving: ", error);
        transition(ERROR_SAVE, true);
      });

  }

  function confirm() {
    transition(CONFIRMING);
  }

  function deleteAppointment(id) {
    console.log("id is: ", id);
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        console.log("Error while deleting: ", error);
        transition(ERROR_DELETE, true);
      });
  }


  return (

    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => confirm()}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={(name, interviewer) => { save(name, interviewer) }} onCancel={() => back()} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={(name, interviewer) => { save(name, interviewer) }} onCancel={() => back()} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRMING && <Confirm message="Are you sure you would like to delete?" onConfirm={() => deleteAppointment(props.id)} onCancel={() => back()} />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={() => back()} />}
    </article>

  );
}