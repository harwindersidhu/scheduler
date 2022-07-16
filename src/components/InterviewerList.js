import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerListItems = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}

/**
 * .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
 */