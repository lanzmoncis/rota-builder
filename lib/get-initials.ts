export const getInitials = (name: string | null) => {
  if (name) {
    const names = name.split(" ");
    const firstName = names[0].charAt(0).toUpperCase();
    return `${firstName}`;
  }
};
