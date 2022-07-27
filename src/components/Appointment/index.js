import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";

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
      .catch((error) => console.log(error));
  }

function confirm() {
  transition(CONFIRMING);
}

function cancel(id) {
  console.log("id is: ", id);
  transition(DELETING);
  props.cancelInterview(id)
  .then(() => transition(EMPTY))
  .catch((error) => console.log(error));
}

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => confirm()}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={(name, interviewer) => { save(name, interviewer) }} onCancel={() => back()} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRMING && <Confirm message="Are you sure you would like to delete?" onConfirm={() => cancel(props.id)} onCancel={() => back()} />}
    </article>

  );
}