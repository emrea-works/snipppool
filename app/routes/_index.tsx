import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/LayoutElements";
import { stdSpace } from "~/settings";

/* ListSnippets  */
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSnippets } from "~/models/snippets.server";

export const loader = async () => {
  return json({ snippets: await getSnippets() });
};

export function ListSnippets() {
  const { snippets } = useLoaderData<typeof loader>();
  console.log(`---> snippets: ${JSON.stringify(snippets, null, 4)}`);
  // @ts-ignore
  const paragraphs = (
    <div>
      {snippets.map((item) => (
        <p key={item.cat}>{item.snippet}</p>
      ))}
    </div>
  );
  const code = (
    <pre className={`bg-gray-900 text-gray-300 rounded-lg p-${stdSpace}`}>
      {snippets.map((item) => `${item.snippet}\n`)}
    </pre>
  );
  return code; //paragraphs;
}
/* . */

/* Insert Snippet */
import { Form } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { setSnippet } from "~/models/snippets.server";
import type { SnippetData } from "~/models/snippets.server";

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  console.log(formData.get("snippet"));
  console.log("formData", formData);
  const snippet = formData.get("snippet") as string;
  const cat = formData.get("cat") as string;
  const tag = formData.get("tag") as string;

  const snippetData: SnippetData = {
    snippet,
    cat,
    tag,
  };

  return json({ snippets: await setSnippet(snippetData) });
}


function InsertSnippet() {
  return (
    <Form method="post">
      <p>
        <label htmlFor="snippet">
          <input className="border w-full" type="text" name="snippet" placeholder="Snippet" /></label>
      </p>
      <p>
        <label htmlFor="cat">
          <input className="border w-full" type="text" name="cat" placeholder="Category" /></label>
      </p>
      <p>
        <label htmlFor="tag">
          <input className="border w-full" type="text" name="tag" placeholder="Tags" /></label>
      </p>

      <button type="submit">Save</button>
    </Form>
  );
}
/**/

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
      {typeof json && typeof useLoaderData ? <ListSnippets /> : "loading..."}
      <InsertSnippet />
    </div>
  );
}
