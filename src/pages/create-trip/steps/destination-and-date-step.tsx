import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../../../components/button";
interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  handleGuestsInputClick: () => void;
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  setDestination: (destination: string) => void;
}
export function DestinationAndDateStep(props: DestinationAndDateStepProps) {
  const {
    isGuestsInputOpen,
    handleGuestsInputClick,
    range,
    setRange,
    setDestination,
  } = props;
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function handleDatePickerClick() {
    setIsDatePickerOpen((prevState) => !prevState);
  }
  const displayedDate =
    range && range.from && range.to
      ? format(range.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(range.to, "d' de 'LLL"))
      : "Quando?";
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="text-zinc-300 size-5" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <button
        onClick={handleDatePickerClick}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left"
      >
        <Calendar className="text-zinc-300 size-5" />
        <span className="text-lg text-zinc-400  flex-1">{displayedDate}</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className=" rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button type="button" onClick={handleDatePickerClick}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <DayPicker mode="range" selected={range} onSelect={setRange} />
            </div>
          </div>
        </div>
      )}

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
