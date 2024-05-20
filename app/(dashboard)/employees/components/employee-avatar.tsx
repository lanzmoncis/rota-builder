"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/get-initials";

interface EmployeeAvatarProps {
  imageUrl: string;
  name: string;
}

export const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({
  imageUrl,
  name,
}) => {
  return (
    <div className=" w-4">
      <Avatar>
        <AvatarImage src={imageUrl} />
        <AvatarFallback className="bg-green-400">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
