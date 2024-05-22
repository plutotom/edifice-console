"use client";
import React from "react";
import { Card } from "../ui/card";
import type { Event } from "../../lib/calTypes";

export default function CalendarWeekView({ data }: { data: Event[] }) {
  console.log(data);
  return (
    <Card className="with-6/12  bg-slate-800">
      <h2 className="px-5 text-2xl">Calendar Week View</h2>
      <div className="CalenderList">
        <ul className="border border-slate-900">
          {data?.map((item, index, arr) => {
            return (
              <CalendarRow item={item} index={index} arr={arr} key={index} />
            );
          })}
        </ul>
      </div>
    </Card>
  );
}

const CalendarRow = ({
  item,
  index,
  arr,
}: {
  item: Event;
  index: number;
  arr: Array<Event>;
}) => {
  index;
  arr;
  return (
    <li className="flex justify-between space-x-2 p-5">
      <div className="flex space-x-2">
        <h3>{new Date(item?.start?.dateTime).toLocaleDateString()}</h3>
        <h3 className="underline underline-offset-auto ">{item.summary}</h3>
        {/* <p className="flex-wrap">{item.summary}</p> */}
      </div>
      <div className="flex space-x-2">
        <h3>{new Date(item?.start?.dateTime).toLocaleTimeString("hh")}</h3>
        <p>{item.eventType}</p>
      </div>
    </li>
  );
};
