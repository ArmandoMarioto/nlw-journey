import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { InviteGuestsModal } from "./invite-guests-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  const [destination, setDestination] = useState<string>("");
  const [range, setRange] = useState<DateRange | undefined>();
  const [ownerName, setOwnerName] = useState<string>("");
  const [ownerEmail, setOwnerEmail] = useState<string>("");

  function handleGuestsInputClick() {
    setIsGuestsInputOpen(!isGuestsInputOpen);
  }
  function handleGuestsModalClick() {
    setIsGuestsModalOpen(!isGuestsModalOpen);
  }
  function handleConfirmTripModalClick() {
    setIsConfirmTripModalOpen(!isConfirmTripModalOpen);
  }
  function addNewEmailToInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }
    if (emailsToInvite.includes(email)) {
      return;
    }
    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  const removeEmailToInvite = (emailToRemove: string) => {
    setEmailsToInvite(
      emailsToInvite.filter((email) => email !== emailToRemove)
    );
  };

  async function createTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(destination);
    console.log(range?.from);
    console.log(range?.to);
    console.log(ownerName);
    console.log(ownerEmail);
    console.log(emailsToInvite);

    if (
      !destination ||
      !range ||
      !ownerName ||
      !ownerEmail ||
      emailsToInvite.length === 0
    ) {
      return;
    }

    const response = await api.post("/trips", {
      destination,
      starts_at: range.from,
      ends_at: range.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });
    const { tripId } = response.data;
    navigate(`/trips/${tripId}`);
  }
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeja sua proxíma viagem!
          </p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateStep
            handleGuestsInputClick={handleGuestsInputClick}
            isGuestsInputOpen={isGuestsInputOpen}
            setDestination={setDestination}
            range={range}
            setRange={setRange}
          />
          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              handleConfirmTripModalClick={handleConfirmTripModalClick}
              handleGuestsModalClick={handleGuestsModalClick}
            />
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            {" "}
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            {" "}
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          handleGuestsModalClick={handleGuestsModalClick}
          removeEmailToInvite={removeEmailToInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          createTrip={createTrip}
          handleConfirmTripModalClick={handleConfirmTripModalClick}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
