import { transform, transformToCSV, transformToTSV } from "usv";

console.log("\nTEXT");
console.log("====");
console.log(transform("a␟b␞c␟d␝e␟f␞g␟h␜i␟j␞k␟l␝m␟n␞o␟p"));
console.log("\nCSV");
console.log("===");
console.log(transformToCSV("a␟b␞c␟d␝e␟f␞g␟h␜i␟j␞k␟l␝m␟n␞o␟p"));
console.log("\nTSV");
console.log("===");
console.log(transformToTSV("a␟b␞c␟d␝e␟f␞g␟h␜i␟j␞k␟l␝m␟n␞o␟p"));
