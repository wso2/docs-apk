// Generate by [js2dts](https://github.com/whxaxes/js2dts#readme)

export interface CheckOption {
  cwd: string;
  fix?: boolean;
  exitLevel?: "none" | "info" | "warn" | "error";
  root?: string[];
  defaultIndex?: string[];
  preset?: string;
  pattern?: string | string[];
  ignore?: string | string[];
}
export interface ReportListItem {
  errMsg: string;
  matchUrl: string;
  fullText: string;
  fileUrl: string;
  line: number;
  col: number;
}
export interface ReportResult {
  msg: string;
  list: ReportListItem[];
  type: "none" | "info" | "warn" | "error";
}
export interface T100 {
  warning: ReportResult;
  deadlink: ReportResult;
}
/**
 * check markdown
 * @param {CheckOption} options
 */
declare function check_1(options: CheckOption): Promise<T100>;
export const check: typeof check_1;
/**
 * check and throw
 * @param {CheckOption} options
 */
declare function checkAndThrow_1(options: CheckOption): Promise<void>;
export const checkAndThrow: typeof checkAndThrow_1;
export interface T101 {
  root: string[];
  cwd: string;
}
export interface T102 {
  defaultIndex: string[];
  root: string[];
  pattern: string;
  ignore: string[];
  cwd: string;
  exitLevel: string;
}
export interface T103 {
  vuepress: T101;
  default: T102;
}
export const presetConfig: T103;
/**
 * set content with cache
 * @param {String} fileUrl
 * @param {String} content
 */
declare function setContent_1(fileUrl: string, content: string): void;
export const setContent: typeof setContent_1;
export interface CacheObj {
  content: string;
  dirty: boolean;
  fileUrl: string;
  headings?: string[];
}
/**
 * get content with cache
 * @param {String} fileUrl
 * @return {CacheObj}
 */
declare function getContent_1(fileUrl: string): CacheObj;
export const getContent: typeof getContent_1;
