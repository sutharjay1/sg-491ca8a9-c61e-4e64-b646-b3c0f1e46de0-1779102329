"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickReference } from "./QuickReference";

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
    y: false
  });
  const [showReference, setShowReference] = useState(false);

  const regexResult = useMemo(() => {
    if (!pattern) {
      return { valid: true, matches: [], error: null };
    }

    try {
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join("");
      
      const regex = new RegExp(pattern, flagString);
      const matches: Array<{ text: string; index: number; groups: string[] }> = [];
      
      if (testString) {
        let match;
        if (flags.g) {
          while ((match = regex.exec(testString)) !== null) {
            matches.push({
              text: match[0],
              index: match.index,
              groups: match.slice(1)
            });
            if (match.index === regex.lastIndex) {
              regex.lastIndex++;
            }
          }
        } else {
          match = regex.exec(testString);
          if (match) {
            matches.push({
              text: match[0],
              index: match.index,
              groups: match.slice(1)
            });
          }
        }
      }

      return { valid: true, matches, error: null };
    } catch (error) {
      return {
        valid: false,
        matches: [],
        error: error instanceof Error ? error.message : "Invalid regex pattern"
      };
    }
  }, [pattern, testString, flags]);

  const highlightedText = useMemo(() => {
    if (!testString || regexResult.matches.length === 0) {
      return testString;
    }

    const segments: Array<{ text: string; isMatch: boolean }> = [];
    let lastIndex = 0;

    regexResult.matches.forEach((match) => {
      if (match.index > lastIndex) {
        segments.push({
          text: testString.slice(lastIndex, match.index),
          isMatch: false
        });
      }
      segments.push({
        text: match.text,
        isMatch: true
      });
      lastIndex = match.index + match.text.length;
    });

    if (lastIndex < testString.length) {
      segments.push({
        text: testString.slice(lastIndex),
        isMatch: false
      });
    }

    return segments;
  }, [testString, regexResult.matches]);

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-6 h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-primary font-mono">/</span>
              Pattern
              <span className="text-primary font-mono">/</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern (e.g., \d{3}-\d{4})"
              className="font-mono text-lg"
            />
            
            <div className="flex flex-wrap gap-4">
              {Object.entries(flags).map(([flag, enabled]) => (
                <div key={flag} className="flex items-center gap-2">
                  <Checkbox
                    id={`flag-${flag}`}
                    checked={enabled}
                    onCheckedChange={() => toggleFlag(flag as keyof typeof flags)}
                  />
                  <Label htmlFor={`flag-${flag}`} className="cursor-pointer font-mono">
                    {flag}
                  </Label>
                </div>
              ))}
            </div>

            {regexResult.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-mono text-sm">
                  {regexResult.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test String
              <Badge variant="secondary" className="font-mono">
                {regexResult.matches.length} {regexResult.matches.length === 1 ? "match" : "matches"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test against the pattern..."
              className="font-mono min-h-[150px] resize-none"
            />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Matches</CardTitle>
          </CardHeader>
          <CardContent>
            {testString && regexResult.valid && (
              <div className="space-y-4">
                <div className="bg-input p-4 rounded-md border border-border min-h-[100px]">
                  <pre className="font-mono text-sm whitespace-pre-wrap break-words">
                    {Array.isArray(highlightedText)
                      ? highlightedText.map((segment, i) => (
                          <span
                            key={i}
                            className={segment.isMatch ? "bg-accent text-accent-foreground px-1 rounded" : ""}
                          >
                            {segment.text}
                          </span>
                        ))
                      : highlightedText}
                  </pre>
                </div>

                {regexResult.matches.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Captured Groups:</h4>
                    {regexResult.matches.map((match, i) => (
                      <div key={i} className="text-sm space-y-1 border-l-2 border-primary pl-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono">
                            #{i + 1}
                          </Badge>
                          <code className="text-accent">{match.text}</code>
                          <span className="text-muted-foreground">at index {match.index}</span>
                        </div>
                        {match.groups.length > 0 && (
                          <div className="text-muted-foreground ml-6">
                            {match.groups.map((group, j) => (
                              <div key={j}>
                                Group {j + 1}: <code className="text-foreground">{group}</code>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:block hidden">
        <div className="sticky top-6">
          <QuickReference />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-4 right-4">
        <Button
          onClick={() => setShowReference(!showReference)}
          className="rounded-full shadow-lg"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${showReference ? "rotate-90" : ""}`} />
          Reference
        </Button>
        {showReference && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 p-4 overflow-auto">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Quick Reference</h2>
                <Button variant="ghost" onClick={() => setShowReference(false)}>
                  Close
                </Button>
              </div>
              <QuickReference />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}