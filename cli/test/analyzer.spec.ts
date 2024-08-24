import { describe, it, expect, beforeEach } from 'vitest';
import { HierarchyAnalyzer } from '../src/hierarchy/hierarchy-analyzer';

describe('HierarchyAnalyzer', () => {
  let analyzer: HierarchyAnalyzer;

  beforeEach(() => {
    analyzer = new HierarchyAnalyzer();
  });

  it('must return correctly at depth 0', () => {
    const result = analyzer.analyzeText('Eu amo papagaios e gorilas', 0);
    const expected = new Map([['animais', 2]]);
    expect(result).toEqual(expected);
  });

  it('must return correctly at depth 1', () => {
    const result = analyzer.analyzeText('Eu amo gorilas e búfalos e águias', 1);
    const expected = new Map([
      ['mamiferos', 2],
      ['aves', 1],
    ]);
    expect(result).toEqual(expected);
  });

  it('must return correctly at depth 2', () => {
    const result = analyzer.analyzeText('Eu amo Jaguars Chimpanzés e rouxinóis', 2);
    const expected = new Map([
      ['carnivoros', 1],
      ['herbivoros', 1],
      ['passaros', 1],
    ]);
    expect(result).toEqual(expected);
  });

  it('should return 0 when there are no matching animals', () => {
    const result = analyzer.analyzeText('Eu gosto de carros e motos', 0);
    const expected = new Map();
    expect(result).toEqual(expected);
  });


  it('should return empty map for a depth with no matches', () => {
    const result = analyzer.analyzeText(
      'Eu tenho preferência por animais carnívoros',
      5
    );
    const expected = new Map();
    expect(result).toEqual(expected);
  });

  it('should throw an error if an invalid depth is given', () => {
    expect(() => {
      analyzer.analyzeText('Eu amo papagaios', -1);
    }).toThrow(Error);
  });

  it('must return correct count with specific verb', () => {
    const result = analyzer.analyzeText('Eu vi papagaios e pardais voando', 2);
    const expected = new Map([['passaros', 2]]);
    expect(result).toEqual(expected);
  });

  it('must correctly process text longer than 5000 characters', () => {
    const phrase = 'Eu amo papagaios e gorilas. '.repeat(250);

    const result = analyzer.analyzeText(phrase, 0);

    const expected = new Map([['animais', 250]]);
    expect(result).toEqual(expected);
  });

  it('must correctly process text longer than 5000 characters at depth 1', () => {
    const phrase = 'Eu amo papagaios e gorilas '.repeat(250);
    const result = analyzer.analyzeText(phrase, 1);
    const expected = new Map([
      ['aves', 250],
      ['mamiferos', 250],
    ]);
    expect(result).toEqual(expected);
  });

  it('must correctly process text longer than 5000 characters at depth 2', () => {
    const phrase = 'Eu amo gorilas e papagaios '.repeat(250);
    const result = analyzer.analyzeText(phrase, 2);

    const expected = new Map([
      ['herbivoros', 250],
      ['passaros', 250],
    ]);
    expect(result).toEqual(expected);
  });
});
