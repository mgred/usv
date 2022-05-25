# usv-cli

```bash
npm i usv-cli
```

## Usage

```bash
usv [OPTION]... [FILE]...
```

### Options

| Flag          | Description                    |
| ------------- | ------------------------------ |
| -h, --help    | Print help message             |
| -u, --unit    | Set unit separator             |
| -r, --record  | Set record separator           |
| -g, --group   | Set group separator            |
| -f, --file    | Set file separator             |
| -n, --newline | Set final newline after output |
| --            | Read from stdin                |

### Examples

Reading from file:

```bash
usv example.usv example42.usv
```

Reading from `stdin`:

```bash
echo "a␟b␞c␟d␝e␟f␞g␟h␜i␟j␞k␟l␝m␟n␞o␟p" | usv
```
