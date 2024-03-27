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
    <>
      <Avatar>
        <AvatarImage src={imageUrl} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
    </>
  );
};
