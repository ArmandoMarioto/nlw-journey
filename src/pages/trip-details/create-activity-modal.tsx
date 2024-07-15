import { Calendar, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
  handleCreateActivityModalClick: () => void;
}

export function CreateActivityModal(props: CreateActivityModalProps) {
  const { tripId } = useParams();
  const { handleCreateActivityModalClick } = props;

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const occurs_at = formData.get("occurs_at")?.toString();
    const newData = new Date(occurs_at ?? "");

    const options = {
      method: "POST",
      url: `/trips/${tripId}/activities`,
      headers: { "Content-Type": "application/json" },
      data: { occurs_at: newData, title: title },
    };
    const response = await api.request(options);

    if (response.status === 200) {
      handleCreateActivityModalClick();
    }
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar nova atividade</h2>
            <button type="button" onClick={handleCreateActivityModalClick}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form className="space-y-3" onSubmit={createActivity}>
          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da atividade"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
              />
            </div>
          </div>
          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  );
}
