"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { FormattedEvent } from "../../_dto/formatDashboardDto";

const Schedule: React.FC<{ events: FormattedEvent[] }> = ({ events }) => (
  <Card className="bg-blue-50">
    <CardContent className="p-4">
      <h2 className="font-medium mb-4">Upcoming tasks</h2>
      {events.map((item, index) => {
        return (
          <React.Fragment key={item.id}>
            <div className="mb-4">
              <p className="text-sm text-gray-600">{item.time.startTime}</p>
              <p className="font-medium">{item.title}</p>
            </div>
            {index < events.length - 1 && (
              <Separator className="mb-4 h-[2px]" />
            )}
          </React.Fragment>
        );
      })}
    </CardContent>
  </Card>
);

export default Schedule;
