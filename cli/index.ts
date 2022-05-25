#!/usr/bin/env node

import { existsSync, readFileSync } from "fs";
import { argv, exit, stdout } from "process";
import { PrintOptions, SeparatorOptions, transform } from "usv";

const args = argv.slice(2);
const options = {
  finalNewline: undefined,
  separators: {} as Partial<SeparatorOptions>,
};
let values = [];
const cliOptions = new Map<TestFn, ActionFn>([
  [test("-h", "--help"), printHelpAndExit],
  [test("-u", "--unit"), readSeparator("unit")],
  [test("-r", "--record"), readSeparator("record")],
  [test("-g", "--group"), readSeparator("group")],
  [test("-f", "--file"), readSeparator("file")],
  [test("-n", "--newline"), () => (options.finalNewline = true)],
  [test("--"), () => readFileToValue(0)],
  [(f) => existsSync(f), readFile],
  [() => true, printUnknownOption],
]);

let arg = "";
args: while ((arg = args.shift()))
  for (const [t, a] of cliOptions.entries())
    if (t(arg) && (a(arg, args) || true)) continue args;

let l = values.length;
let i = 0;
const checks = [
  (i: number) => i + 1 < l,
  () => Boolean(!options.finalNewline),
];
for (; i < l; i++) {
  const result = transform(values[i], options as Partial<PrintOptions>);
  stdout.write(result);

  for (const check of checks)
    if (check(i)) stdout.write("\n");
    else break;
}

function printUnknownOption(option: string): void {
  console.error(`Unknown option: '${option}'`);
  exit(1);
}

function readFileToValue(file: string | number) {
  values.push(readFileSync(file).toString());
}

function readFile(file: string): void {
  try {
    readFileToValue(file);
  } catch (e) {
    console.error(`Could not read file '${file}'\n`, e.message);
    exit(1);
  }
}

function readSeparator(name: string): ActionFn {
  return (_, rest) => (options.separators[name] = rest.shift());
}

function test(...flags: string[]): TestFn {
  return (value) => flags.some((f) => f === value);
}

function printHelpAndExit(): void {
  stdout.write(`
usv cli 0.0.0-PLACEHOLDER

Usage: usv [OPTION]... [FILE]...

Options:

  -h, --help      Print help message
  -u, --unit      Set unit separator
  -r, --record    Set record separator
  -g, --group     Set group separator
  -f, --file      Set file separator
  -n, --newline   Set final newline after output
  --              Read from stdin
`);
  exit(0);
}

type TestFn = (value: string) => boolean;
type ActionFn = (current: string, rest: string[]) => unknown;
