import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  handleGuestsInputClick: () => void;
}
export function DestinationAndDateStep(props: DestinationAndDateStepProps) {
  const { isGuestsInputOpen, handleGuestsInputClick } = props;
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="text-zinc-300 size-5" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        />
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="text-zinc-300 size-5" />
        <input
          type="text"
          placeholder="Quando?"
          disabled={isGuestsInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
        />
      </div>

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button variant="secondary" onClick={handleGuestsInputClick}>
          Alterar local/data
          <Settings2 className="size-5 " />
        </Button>
      ) : (
        <Button variant="primary" onClick={handleGuestsInputClick}>
          Continuar
          <ArrowRight className="size-5 " />
        </Button>
      )}
    </div>
  );
}
