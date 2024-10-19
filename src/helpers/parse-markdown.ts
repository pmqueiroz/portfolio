import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

export async function parseMarkdown(content: string): Promise<string> {
    const parsedContent = await unified()
        .use(remarkParse)
        .use(remarkHtml, { sanitize: false })
        .process(content)

    return parsedContent.value as string
}
