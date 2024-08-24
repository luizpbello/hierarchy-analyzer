import { HierarchyAnalyzer } from './hierarchy/hierarchy';

const instance = new HierarchyAnalyzer();

const main = instance.analyzeText('Eu sou papagaios papagaios papagaios papagaios Gorilas', 1);

console.log(main);
