import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpots = (spots) => {
  let formattedString = "";
  if (spots === 0) {
    formattedString = "no spots remaining";
  } else if (spots === 1) {
    formattedString = "1 spot remaining";
  } else {
    formattedString = `${spots} spots remaining`;
  }
  return formattedString;
}

export default function DayListItem(props) {

  let dayClass = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots === 0
  });
  dayClass = dayClass.replace(/\s/g, '');

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}