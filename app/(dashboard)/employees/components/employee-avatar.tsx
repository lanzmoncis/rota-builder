"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface EmployeeAvatarProps {
  imageUrl: string;
  name: string;
}

export const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({
  imageUrl,
  name,
}) => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const firstName = names[0].charAt(0).toUpperCase();
    const lastName = names[names.length - 1].charAt(0).toUpperCase();
    return `${firstName}${lastName}`;
  };

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
