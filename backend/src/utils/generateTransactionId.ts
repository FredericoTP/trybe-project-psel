const generateId = (): string => {
  let result = '';

  for (let index = 0; index < 24; index += 1) {
    const digit = Math.floor(Math.random() * 10);
    result += digit.toString();
  }

  return result;
};

export default generateId;
