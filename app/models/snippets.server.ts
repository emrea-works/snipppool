type SnippetData = {
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
}