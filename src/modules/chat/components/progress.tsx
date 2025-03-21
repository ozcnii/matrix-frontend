export const Progress = ({
  current,
  max,
}: {
  current: number;
  max: number;
}) => {
  if (current > max) {
    current = max;
  }

  if (current < 0) {
    current = 0;
  }

  const percent = (current / max) * 100;
  const strokeDashoffset = 100 - percent;

  return (
    <div className="relative h-[35px] w-[35px]">
      {/* Фоновый круг */}
      <svg
        className="absolute inset-0"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#6B7280"
          strokeWidth="10"
        />
      </svg>

      {/* Динамический прогресс-круг */}
      <svg
        className="absolute inset-0"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#fff"
          strokeWidth="10"
          strokeDasharray="282.74" // Длина окружности (2πr)
          strokeDashoffset={strokeDashoffset * 2.8274} // Уменьшаем на процент заполнения
          strokeLinecap="round"
        />
      </svg>

      <div className="flex items-center justify-center h-full w-full text-white font-bold">
        {current}
      </div>
    </div>
  );
};
