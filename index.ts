export function transform(
  value: string,
  options?: Partial<PrintOptions>
): string {
  value = value.trim();

  if (!value) {
    return value;
  }

  options = defaultOptions(options);

  const pass: ParseFn = (c) => c;
  const unit = parseFactory(USVSeparator.UNIT, options.separators.unit);
  const record = parseFactory(USVSeparator.RECORD, options.separators.record);
  const group = parseFactory(USVSeparator.GROUP, options.separators.group);
  const file = parseFactory(USVSeparator.FILE, options.separators.file);

  let char: string;
  let i = 0;
  let output = "";

  while ((char = value.charAt(i++)))
    output += file(group(record(unit(pass))))(char);

  return options.finalNewline ? addNewline(output) : output;
}

export enum USVSeparator {
  FILE = "\u241C",
  GROUP = "\u241D",
  RECORD = "\u241E",
  UNIT = "\u241F",
}

export interface SeparatorOptions {
  file: string;
  group: string;
  record: string;
  unit: string;
}

export interface PrintOptions {
  finalNewline?: boolean;
  separators?: SeparatorOptions;
}

const NEWLINE = "\n";

const DEFAULT_OPTIONS: PrintOptions = {
  finalNewline: false,
  separators: {
    file: `${NEWLINE}===${NEWLINE}`,
    group: `${NEWLINE}---${NEWLINE}`,
    record: NEWLINE,
    unit: ",",
  },
};

function defaultOptions(options: Partial<PrintOptions>): PrintOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    separators: {
      ...DEFAULT_OPTIONS.separators,
      ...options.separators,
    },
  };
}

function addNewline(value: string): string {
  return `${value}${NEWLINE}`;
}

type ParseFn = (v: string) => string;

function parse(s: USVSeparator, o: string, x: ParseFn): ParseFn {
  return (v) => {
    return v === s ? o : x(v);
  };
}

function parseFactory(s: USVSeparator, o: string): (x: ParseFn) => ParseFn {
  return (x) => parse(s, o, x);
}

export function transformToTSV(value: string): string {
  return transform(value, {
    separators: { unit: "\t", record: NEWLINE, group: NEWLINE, file: NEWLINE },
  });
}

export function transformToCSV(value: string): string {
  return transform(value, {
    separators: { unit: ",", record: NEWLINE, group: NEWLINE, file: NEWLINE },
  });
}
