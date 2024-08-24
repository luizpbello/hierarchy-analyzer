import { HierarchyAnalyzer } from './hierarchy/hierarchy-analyzer';
import Table from 'cli-table3';

function parseArguments(args: string[]): {
  depth: number;
  verbose: boolean;
  phrase: string;
} {
  const depthArg = args.find((arg) => arg.startsWith('--depth='));
  const depth = depthArg ? parseInt(depthArg.split('=')[1], 10) : NaN;

  if (isNaN(depth) || depth < 0) {
    console.error(
      'Profundidade inválida. Deve ser um número inteiro não negativo.'
    );
    process.exit(1);
  }

  const verbose = args.includes('--verbose');
  const phraseIndex = args.indexOf('--depth=');
  const phraseArgs = phraseIndex === -1 ? args : args.slice(phraseIndex + 1);
  const phrase = phraseArgs.join(' ');

  return { depth, verbose, phrase };
}

function measureExecutionTime(callback: () => void): [number, number] {
  const start = process.hrtime();
  callback();
  return process.hrtime(start);
}

function printVerboseOutput(
  output: string,
  totalMilliseconds: number,
  analysisMilliseconds: number
) {
  const table = new Table({
    head: ['Descrição', 'Tempo (ms)'],
    colWidths: [40, 15],
  });

  table.push(
    {
      'Tempo de carregamento dos parâmetros': (
        totalMilliseconds - analysisMilliseconds
      ).toFixed(3),
    },
    { 'Tempo de verificação da frase': analysisMilliseconds.toFixed(3) }
  );

  console.log(output.trim());
  console.log(table.toString());
}

function main() {
  const args = process.argv.slice(2);
  const { depth, verbose, phrase } = parseArguments(args);

  const start = process.hrtime();
  const analyzer = new HierarchyAnalyzer();

  let result: Map<string, number>;

  const [analysisSeconds, analysisNanoseconds] = measureExecutionTime(() => {
    result = analyzer.analyzeText(phrase, depth);
  });

  const [totalSeconds, totalNanoseconds] = process.hrtime(start);
  const totalMilliseconds = totalSeconds * 1000 + totalNanoseconds / 1e6;
  const analysisMilliseconds =
    analysisSeconds * 1000 + analysisNanoseconds / 1e6;

  let output = '';
  for (const [key, value] of result.entries()) {
    output += `${key} = ${value}\n`;
  }

  if (verbose) {
    printVerboseOutput(output, totalMilliseconds, analysisMilliseconds);
  } else {
    console.log(output.trim());
  }
}

main();
