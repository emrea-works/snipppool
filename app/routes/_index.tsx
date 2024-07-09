import type { MetaFunction } from "@remix-run/node";
import { Header } from '~/components/LayoutElements';
import { stdSpace } from '~/settings';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSnippets } from '~/models/snippets.server';

export const loader = async () => {
  return json({ snippets: await getSnippets() });
};

const ListSnippets = () => {
  const { snippets } = useLoaderData<typeof loader>();
  const paragraphs = <div>
    {snippets.map((item) => (<p key={item.cat}>{item.snippet}</p>))}
  </div>;
  const code = <pre>{snippets.map((item) => (`${item.snippet}\n`))}</pre>;
  return code; //paragraphs;
};

export const meta: MetaFunction = () => {
  return [
    { title: "sniPPPool" },
    { name: "description", content: "A Raw Snippet Pool" },
  ];
};

export default function Index() {
  return (
    <div className={`container mx-auto p-${stdSpace}`}>
      <Header />
      <ListSnippets />
    </div>
  );
}
