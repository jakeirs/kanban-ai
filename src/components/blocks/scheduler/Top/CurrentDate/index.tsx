export const CurrentDate = () => {
  const date = new Date();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-900 p-4 rounded-lg text-white">
      <div className="text-xl">{dayName}</div>
      <div className="text-6xl font-extrabold mt-1">{dayNumber}</div>
      <div className="text-xl font-bold mt-1">{monthName}</div>
    </div>
  );
};
