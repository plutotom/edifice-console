// make a simpel cander tsx component
import React from "react";
import { Card } from "../ui/card";

export default function CalendarWeekView() {
  const CalendarWeekData = [
    {
      date: "2021-10-11",
      title: "Meeting",
      description: "Discuss the new project",
      time: "10:00",
      location: "Office",
    },
  ];

  return (
    <Card className="with-6/12 border border-slate-500 bg-stone-700">
      <h2 className="px-5">Calendar Week View</h2>
      <div className="CalenderList">
        <ul>
          {CalendarWeekData.map((item, index) => {
            return (
              <li key={index} className="flex justify-between space-x-2 p-5">
                <div className="flex space-x-2">
                  <h3>{item.date}</h3>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="flex space-x-2">
                  <p>{item.time}</p>
                  <p>{item.location}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
