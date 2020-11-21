const ConvertDate = (item) => {
  let dateObj = new Date(item.date.seconds * 1000);
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  let day = dateObj.getDate();
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  return {
    month,
    year,
    day,
    hour,
    minutes,
    seconds,
  };
};

export default ConvertDate;
