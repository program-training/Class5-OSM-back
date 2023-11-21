export const generateAuthToken = () => {
  const randomToken = Math.random().toString(36).substring(2, 15);
  return randomToken;
};
