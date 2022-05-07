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
  finalNewline: boolean;
  separators: SeparatorOptions;
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

export function transform(
  value: string,
  options?: Partial<PrintOptions>
): string {
  value = value.trim();

  if (!value) {
    return value;
  }

  options = { ...DEFAULT_OPTIONS, ...options };

  let char = "";
  let i = 0;
  let output = "";

  while ((char = value.charAt(i++))) {
    switch (char) {
      case USVSeparator.UNIT:
        output += options.separators.unit;
        continue;
      case USVSeparator.RECORD:
        output += options.separators.record;
        continue;
      case USVSeparator.GROUP:
        output += options.separators.group;
        continue;
      case USVSeparator.FILE:
        output += options.separators.file;
        continue;
      default:
        output += char;
    }
  }

  if (options.finalNewline) {
    output += NEWLINE;
  }

  return output;
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
