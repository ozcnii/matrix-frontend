export const Checkbox = ({
  checked = false,
  onChange,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  return (
    <div
      onClick={() => onChange && onChange(!checked)}
      className={`cursor-pointer select-none w-5 h-5 flex items-center justify-center border-2 rounded transition-colors duration-200 
          ${checked ? "bg-black border-white" : "border-[#CCCCCC66]"} `}
    >
      {checked && (
        <span className="text-white">
          <CheckboxSvg />
        </span>
      )}
    </div>
  );
};

const CheckboxSvg = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6373 6.98766C14.7129 7.06312 14.7728 7.15273 14.8137 7.25136C14.8546 7.35 14.8756 7.45572 14.8756 7.5625C14.8756 7.66928 14.8546 7.775 14.8137 7.87364C14.7728 7.97227 14.7129 8.06188 14.6373 8.13734L8.94984 13.8248C8.87438 13.9004 8.78477 13.9603 8.68614 14.0012C8.5875 14.0421 8.48178 14.0631 8.375 14.0631C8.26822 14.0631 8.1625 14.0421 8.06386 14.0012C7.96523 13.9603 7.87562 13.9004 7.80016 13.8248L5.36266 11.3873C5.2102 11.2349 5.12455 11.0281 5.12455 10.8125C5.12455 10.5969 5.2102 10.3901 5.36266 10.2377C5.51511 10.0852 5.72189 9.99955 5.9375 9.99955C6.15311 9.99955 6.35989 10.0852 6.51234 10.2377L8.375 12.1013L13.4877 6.98766C13.5631 6.91211 13.6527 6.85218 13.7514 6.8113C13.85 6.77041 13.9557 6.74936 14.0625 6.74936C14.1693 6.74936 14.275 6.77041 14.3736 6.8113C14.4723 6.85218 14.5619 6.91211 14.6373 6.98766Z"
        fill="white"
      />
    </svg>
  );
};
