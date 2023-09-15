// Handle date conversion
const getDate = (arg) => {
  const date = new Date(arg);
  const day = date.toLocaleDateString("en-GB");
  return day;
};

export default getDate;
