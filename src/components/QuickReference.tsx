import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const referenceData = [
  {
    category: "Character Classes",
    patterns: [
      { pattern: ".", description: "Any character except newline" },
      { pattern: "\\d", description: "Digit (0-9)" },
      { pattern: "\\D", description: "Not a digit" },
      { pattern: "\\w", description: "Word character (a-z, A-Z, 0-9, _)" },
      { pattern: "\\W", description: "Not a word character" },
      { pattern: "\\s", description: "Whitespace (space, tab, newline)" },
      { pattern: "\\S", description: "Not whitespace" },
      { pattern: "[abc]", description: "Any of a, b, or c" },
      { pattern: "[^abc]", description: "Not a, b, or c" },
      { pattern: "[a-z]", description: "Character between a and z" }
    ]
  },
  {
    category: "Quantifiers",
    patterns: [
      { pattern: "*", description: "0 or more" },
      { pattern: "+", description: "1 or more" },
      { pattern: "?", description: "0 or 1" },
      { pattern: "{n}", description: "Exactly n times" },
      { pattern: "{n,}", description: "n or more times" },
      { pattern: "{n,m}", description: "Between n and m times" }
    ]
  },
  {
    category: "Anchors & Boundaries",
    patterns: [
      { pattern: "^", description: "Start of string/line" },
      { pattern: "$", description: "End of string/line" },
      { pattern: "\\b", description: "Word boundary" },
      { pattern: "\\B", description: "Not a word boundary" }
    ]
  },
  {
    category: "Groups & References",
    patterns: [
      { pattern: "(abc)", description: "Capture group" },
      { pattern: "(?:abc)", description: "Non-capturing group" },
      { pattern: "\\1", description: "Backreference to group 1" },
      { pattern: "(?<name>abc)", description: "Named capture group" }
    ]
  },
  {
    category: "Lookaround",
    patterns: [
      { pattern: "(?=abc)", description: "Positive lookahead" },
      { pattern: "(?!abc)", description: "Negative lookahead" },
      { pattern: "(?<=abc)", description: "Positive lookbehind" },
      { pattern: "(?<!abc)", description: "Negative lookbehind" }
    ]
  },
  {
    category: "Common Patterns",
    patterns: [
      { pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", description: "Email address" },
      { pattern: "^\\d{3}-\\d{3}-\\d{4}$", description: "Phone (xxx-xxx-xxxx)" },
      { pattern: "^https?://[^\\s]+$", description: "URL" },
      { pattern: "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$", description: "Hex color" },
      { pattern: "^\\d{4}-\\d{2}-\\d{2}$", description: "Date (YYYY-MM-DD)" }
    ]
  }
];

export function QuickReference() {
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle>Quick Reference</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={["Character Classes", "Quantifiers"]} className="w-full">
          {referenceData.map((section) => (
            <AccordionItem key={section.category} value={section.category}>
              <AccordionTrigger className="text-sm font-semibold">
                {section.category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {section.patterns.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1 pb-2 border-b border-border last:border-0">
                      <code className="text-primary font-mono text-sm bg-input px-2 py-1 rounded inline-block">
                        {item.pattern}
                      </code>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}