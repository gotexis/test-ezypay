// mock api performance
export const possibility = (p = 0.5, trueComment, falseComment, ...args) => {
  if (args.length !== 0) {
    console.log(args);
  }
  const result = Math.random() >= p;
  console.log('Random result generated. Randomized result evaluates to: ', result ? trueComment : falseComment);
  return result;
};

export const randInt = (min, max) => {
  const localMin = Math.ceil(min);
  const localMax = Math.floor(max);
  return Math.floor(Math.random() * (localMax - localMin)) + localMin;
};

export const randChoice = arr => arr[Math.floor(arr.length * Math.random())];

export default possibility;
