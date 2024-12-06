import NemoImage from "@/modules/common/assets/nemo.png";
import { StepsContainer } from "../components/steps-container";
import { useInformed } from "@/modules/common/contexts/informed";

export const InformingPage = () => {
  const { setInformed } = useInformed();

  const onStart = () => {
    setInformed(true);
  };

  return (
    <div className="flex flex-col h-full justify-center items-center p-4">
      <div className="green-overlay absolute h-64 w-64 bg-center top-5 right-0" />
      <div className="green-overlay absolute h-64 w-64 bg-center top-24 -left-32" />

      <div>
        <img className="h-[134px] w-[193px]" src={NemoImage} alt="nemo" />
      </div>

      <div className="max-w-md text-center w-full space-y-6">
        <StepsContainer onStart={onStart} />
      </div>
    </div>
  );
};
