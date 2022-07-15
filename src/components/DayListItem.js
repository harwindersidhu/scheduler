import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  let dayClass = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots === 0
  });
  dayClass = dayClass.replace(/\s/g, '');

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}