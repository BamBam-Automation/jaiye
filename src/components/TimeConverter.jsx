// Handle Time Conversion
const getTime = (arg) => {
  const date = new Date(arg);
  const time = date.toLocaleTimeString();
  return time;
};

export default getTime;
