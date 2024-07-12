/* type SnippetData = {
  snippet: string;
  cat: string;
  tag: string[];
}

export async function getSnippets(): Promise<Array<SnippetData>> {
  return [
    {
      snippet: 'ls -la',
      cat: 'bash',
      tag: ['bash, files'],
    },
    {
      snippet: 'du -h . --max-depth=1 | sort -rh | head -10',
      cat: 'bash',
      tag: ['bash', 'storage'],
    }
  ];
} */

// import { prisma } from "~/db.server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getSnippets() {
  return prisma.snippet.findMany();
}

export type SnippetData = {
  snippet: string;
  cat: string;
  tag: string;
};

export async function setSnippet(data: SnippetData) {
  const { snippet, cat, tag } = data;
  const newSnippet = await prisma.snippet.create({
    data: {
      snippet: snippet,
      cat: cat,
      tag: tag,
    },
  });

  return newSnippet;
}
