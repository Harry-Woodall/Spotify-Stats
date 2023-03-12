const Helpers = {
  mapRange(number: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  },
  convertTime(time: number) {
    return `${Math.floor(time / 1000 / 60)}:${("0" + Math.round(((time / 1000 / 60) % 1) * 60)).slice(-2)}`;
  },
};

export default Helpers;
