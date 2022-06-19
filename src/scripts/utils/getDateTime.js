const getDateTime = (mod) => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  if (mod === "date") {
    return `${day}.${month}.${year}`;
  } else if (mod === "time") {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${day}.${month}.${year} | ${hours}:${minutes}`;
  }
};

export { getDateTime };
