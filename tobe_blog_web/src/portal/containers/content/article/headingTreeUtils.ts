import { v4 as uuidv4 } from 'uuid';

export interface HeadingInfo {
  id: string;
  text: string;
  level: number;
}

export interface HeadingTreeNode extends HeadingInfo {
  children: HeadingTreeNode[];
}

/**
 * Parse HTML string, extract all h1~h4 headings, return an array with id, text, level, and the HTML with ids added.
 * Ensures the heading order is consistent with the original document.
 */
export function parseHeadingsFromHtml(html: string): { headings: HeadingInfo[]; htmlWithIds: string } {
  if (!html) {
    return { headings: [], htmlWithIds: '' };
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings: HeadingInfo[] = [];
  // Traverse all elements under body, extract h1~h4 in order
  function traverse(node: Element) {
    if (/^H[1-4]$/.test(node.tagName)) {
      const text = node.textContent?.trim() ?? '';
      if (text) {
        const id = `heading-${uuidv4()}`;
        node.setAttribute('id', id);
        headings.push({
          id,
          text,
          level: Number(node.tagName[1]),
        });
      }
    }
    // Recursively traverse child nodes
    Array.from(node.children).forEach(traverse);
  }
  traverse(doc.body);
  return { headings, htmlWithIds: doc.body.innerHTML };
}

export function buildHeadingTree(headings: HeadingInfo[]): HeadingTreeNode[] {
  const root: HeadingTreeNode = { id: 'root', text: '', level: 0, children: [] };
  const stack: HeadingTreeNode[] = [root];

  for (const h of headings) {
    const node: HeadingTreeNode = { ...h, children: [] };
    while (stack.length > 0 && stack[stack.length - 1].level >= h.level) {
      stack.pop();
    }
    stack[stack.length - 1].children.push(node);
    stack.push(node);
  }
  return root.children;
} 