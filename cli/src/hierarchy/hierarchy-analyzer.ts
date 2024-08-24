import * as fs from 'fs';
import * as path from 'path';
import { Hierarchy } from '../interfaces/hierarchy.interface';
import { IHierarchyAnalyzer } from '../interfaces/Ihierarchy-analyzer.interface';

export class HierarchyAnalyzer implements IHierarchyAnalyzer {
  private data: Hierarchy;

  constructor() {
    const filePath = path.resolve(__dirname, '../../../dicts/hierarchy.json');
    this.data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  public analyzeText(text: string, depth: number): Map<string, number> {
    if (depth < 0 || !Number.isInteger(depth)) {
      throw new Error(
        'Profundidade inválida. Deve ser um número inteiro não negativo.'
      );
    }

    const hierarchyMap = this.buildHierarchyMap(this.data, depth);
    const words = this.sanitizeWords(text.split(' '));
    const categoryCount = new Map<string, number>();

    for (const word of words) {
      const category = hierarchyMap.get(word);
      if (!category) continue;
      if (!categoryCount.has(category)) categoryCount.set(category, 0);
      categoryCount.set(category, categoryCount.get(category)! + 1);
    }

    return categoryCount;
  }

  private buildHierarchyMap(
    hierarchy: Hierarchy,
    depth: number,
    hierarchyPath: Array<string> = [],
    map: Map<string, string> = new Map()
  ): Map<string, string> {
    for (let key in hierarchy) {
      const extendedPath = [...hierarchyPath, key];
      if (Array.isArray(hierarchy[key])) {
        if (depth < extendedPath.length) {
          const normalizedPath = this.sanitizeWord(extendedPath[depth]);
          hierarchy[key].forEach((item) =>
            map.set(this.sanitizeWord(item), normalizedPath)
          );
        }
      } else if (typeof hierarchy[key] === 'object') {
        this.buildHierarchyMap(hierarchy[key], depth, extendedPath, map);
      }
    }
    return map;
  }

  public sanitizeWord(word: string): string {
    return word
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  public sanitizeWords(words: string[]): string[] {
    return words.map(this.sanitizeWord);
  }
}
