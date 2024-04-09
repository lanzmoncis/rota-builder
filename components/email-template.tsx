import { Shift } from "@prisma/client";
import * as React from "react";

interface EmailTemplateProps {
  name: string;
  shifts: Shift[];
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  shifts,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <ul>
      {shifts.map((shift) => (
        <li key={shift.id}>
          <p>{new Date(shift.date).toLocaleDateString()}</p>
          <p>{shift.department}</p>
          <p>{shift.shiftTime}</p>
        </li>
      ))}
    </ul>
  </div>
);
