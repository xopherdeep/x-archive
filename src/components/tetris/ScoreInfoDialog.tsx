"use client"

import * as React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy, Info } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SCORE_MAP } from "./constants"

interface ScoreInfoDialogProps {
  topScore: number;
  currentScore: number;
}

export function ScoreInfoDialog({ topScore, currentScore }: ScoreInfoDialogProps) {
  // Mock high scores for demonstration
  const highScores = React.useMemo(() => [
    { name: "YOU", score: currentScore, date: new Date().toLocaleDateString() },
    { name: "TOP", score: topScore, date: "All-time" },
    { name: "NES", score: 999999, date: "Classic" },
    { name: "CPU", score: 500000, date: "AI Player" },
    { name: "PRO", score: 750000, date: "Champion" },
  ].sort((a, b) => b.score - a.score).slice(0, 5), [topScore, currentScore]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Trophy className="h-4 w-4" />
          <span>Scores</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>High Scores</DialogTitle>
          <DialogDescription>
            The top Tetris players of all time
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {highScores.map((score, index) => (
                <TableRow key={index} className={score.name === "YOU" ? "font-bold bg-muted/50" : ""}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{score.name}</TableCell>
                  <TableCell className="text-right">{score.score.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{score.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="border rounded-md p-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Scoring System
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Single line clear</TableCell>
                  <TableCell className="text-right">{SCORE_MAP[1]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Double line clear</TableCell>
                  <TableCell className="text-right">{SCORE_MAP[2]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Triple line clear</TableCell>
                  <TableCell className="text-right">{SCORE_MAP[3]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tetris (4 lines)</TableCell>
                  <TableCell className="text-right">{SCORE_MAP[4]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Level multiplier</TableCell>
                  <TableCell className="text-right">×{" "}Level</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground mt-2">
              The higher your level, the faster pieces fall and the more points you earn!
            </p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
