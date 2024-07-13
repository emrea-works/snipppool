import type { MetaFunction } from "@remix-run/node";
import { stdSpace } from "~/settings";
import { Header, Footer } from "~/components/LayoutElements";

/* -------------------------------------------------------------------------- */
/* ListSnippets  */
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSnippets } from "~/models/snippets.server";

export const loader = async () => {
  return json({ snippets: await getSnippets() });
};

export function ListSnippets() {
  const { snippets } = useLoaderData<typeof loader>();
  // console.log(`---> snippets: ${JSON.stringify(snippets, null, 4)}`);
  function handleClick(e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    console.log("e:", target.innerText);
    navigator.clipboard.writeText(target.innerText);
  }
  return (
    <table >
      {snippets.map((item: any) => (
        <tr key={item.id} className={`w-full font-mono text-xs`}>
          <td>{item.id}{") "}</td>
          <td onClick={(e)=>handleClick(e)}>{item.snippet}</td>
          <td>
            <span className="self-end">
              {item.tag} {item.cat}
            </span>
          </td>
        </tr>
      ))}
    </table>
  );
}
/* -------------------------------------------------------------------------- */
//* Insert Snippet */
import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
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

export function InsertSnippet() {
  const feWrapper = `my-${stdSpace - 2}`;
  const fElement = `rounded-md p-1 bg-gray-100 font-mono w-full `;
  return (
    <Form method="post" className="my-3">
      <div className="flex w-full">
        <div className={`${feWrapper} w-full`}>
          <label htmlFor="snippet">
            <input
              className={fElement}
              type="text"
              name="snippet"
              placeholder="Snippet"
            />
          </label>
        </div>
      </div>

      <div className="flex lg:flex-row lg:justify-between sm:flex-col sm:justify-center gap-3">
        <div className={`${feWrapper} w-full`}>
          <label htmlFor="cat">
            <input
              className={fElement}
              type="text"
              name="cat"
              placeholder="Category"
            />
          </label>
        </div>
        <div className={`${feWrapper} w-full`}>
          <label htmlFor="tag">
            <input
              className={fElement}
              type="text"
              name="tag"
              placeholder="Tags"
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <button
          type="submit"
          className={`my-${
            stdSpace - 2
          } w-full bg-gray-700 text-gray-100 px-5 py-2 rounded bg-primary`}
        >
          Save
        </button>
      </div>
    </Form>
  );
}
/* -------------------------------------------------------------------------- */

export const meta: MetaFunction = () => {
  return [
    { title: "sniPPPool" },
    { name: "description", content: "A Raw Snippet Pool" },
  ];
};

export default function Index() {
  return (
    <div className={`flex flex-col content-around h-screen`}>
      <div className="container mx-auto grow">
        <Header />
        {typeof json && typeof useLoaderData && stdSpace ? (
          <ListSnippets />
        ) : (
          "loading..."
        )}
        <InsertSnippet />
      </div>
      <Footer />
    </div>
  );
}
