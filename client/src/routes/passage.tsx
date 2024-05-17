import {createFileRoute, notFound} from '@tanstack/react-router'
import {getPassage} from "@/state-management/passage";
import {Passage} from "@/components/Passage/Passage";
import {StatusContent} from "@/components/StatusContent/StatusContent";

interface IPassageSearchParams {
    id: string;
}

export const Route = createFileRoute('/passage')({
  validateSearch: ({ id }: IPassageSearchParams) => ({
    id: Number(id) || 0
  }),
  loaderDeps: ({ search: { id } }) => ({ id }),
  loader: async ({ deps: { id } }) => {
    try {
      await getPassage(id);
    } catch (e) {
      throw notFound();
    }
  },
  component: Passage,
  notFoundComponent: () => <StatusContent status={404} />
})