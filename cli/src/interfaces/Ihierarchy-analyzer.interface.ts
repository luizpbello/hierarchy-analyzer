import { Hierarchy } from './hierarchy.interface';

export interface IHierarchyAnalyzer {
    /**
     * Analisa o texto fornecido e retorna um mapa de categorias e suas respectivas contagens.
     * 
     * @param text - Texto a ser analisado.
     * @param depth - Profundidade da análise, indicando até onde no hierarquia a análise deve ir.
     * @returns Um mapa onde as chaves são categorias e os valores são a contagem de ocorrências.
     * @throws Erro se a profundidade for inválida.
     * 
     * @example
     * ```typescript
     * const analyzer = new HierarchyAnalyzer();
     * const result = analyzer.analyzeText('Eu amo gorilas e búfalos e águias', 1);
     * console.log(result);
     * // Output: Map(2) { 'mamiferos' => 2, 'aves' => 1 }
     * ```
     */
    analyzeText(text: string, depth: number): Map<string, number>;
  
    /**
     * Sanitiza uma palavra, removendo acentos e convertendo para minúsculas.
     * 
     * @param word - Palavra a ser sanitizada.
     * @returns A palavra sanitizada.
     * 
     * @example
     * ```typescript
     * const analyzer = new HierarchyAnalyzer();
     * const result = analyzer.sanitizeWord('Búfalos');
     * console.log(result);
     * // Output: 'bufalos'
     * ```
     */
    sanitizeWord(word: string): string;
  
    /**
     * Sanitiza uma lista de palavras, removendo acentos e convertendo para minúsculas.
     * 
     * @param words - Lista de palavras a serem sanitizadas.
     * @returns A lista de palavras sanitizadas.
     * 
     * @example
     * ```typescript
     * const analyzer = new HierarchyAnalyzer();
     * const result = analyzer.sanitizeWords(['Gorilas', 'e', 'Búfalos']);
     * console.log(result);
     * // Output: ['gorilas', 'e', 'bufalos']
     * ```
     */
    sanitizeWords(words: string[]): string[];
  }
  