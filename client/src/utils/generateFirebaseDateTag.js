const generateFirebaseDateTag = () => {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, '0');
  const numericMonth = (now.getMonth() + 1).toString().padStart(2, '0'); // sayısal ay istersen
  const year = now.getFullYear();

  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');
  const millisecond = now.getMilliseconds().toString().padStart(3, '0');

  return `${day}-${numericMonth}-${year}-${hour}-${minute}-${second}-${millisecond}`;
};

export default generateFirebaseDateTag;
