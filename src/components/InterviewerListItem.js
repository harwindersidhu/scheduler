import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  let interviewerClass = classNames("interviewers__item", {
    "--selected": props.selected
  });
  interviewerClass = interviewerClass.replace(/\s/g, '');

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

