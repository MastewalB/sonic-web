export const displayDuration = (time) => {
    function padZero(v) {
      return v < 10 ? "0" + v : v;
    }
    const sec = Math.round(time % 60);
    const min = Math.round((time / 60) % 60);
    const hr = Math.round((time / (60 * 60)) % 24);
    const hourFormat = hr > 0 ? padZero(hr) + ":" : "";
    return (
      hourFormat +
      padZero(time ? min : 0) +
      ":" +
      padZero(time ? sec : 0)
    );
  };
  