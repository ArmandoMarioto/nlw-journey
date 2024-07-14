import { ArrowRight, UserRoundPlusIcon } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
  handleGuestsModalClick: () => void;
  handleConfirmTripModalClick: () => void;
  emailsToInvite: string[];
}

export function InviteGuestsStep(props: InviteGuestsStepProps) {
  const {
    handleGuestsModalClick,
    handleConfirmTripModalClick,
    emailsToInvite,
  } = props;
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        type="button"
        className="flex items-center gap-2 flex-1 text-left"
        onClick={handleGuestsModalClick}
      >
        <UserRoundPlusIcon className="text-zinc-300 size-5" />
        {emailsToInvite.length > 0 ? (
          <span className="bg-transparent text-lg text-zinc-100 flex-1">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="bg-transparent text-lg text-zinc-400 flex-1">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      <Button variant="primary" onClick={handleConfirmTripModalClick}>
        Confirmar viagem
        <ArrowRight className="size-5 " />
      </Button>
    </div>
  );
}
