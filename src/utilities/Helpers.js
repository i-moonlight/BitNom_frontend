export const getUserInitials = nameString => {
  const fullNames = nameString?.toUpperCase();
  const initials = fullNames?.match(/\b(\w)/g);
  return initials;
};
