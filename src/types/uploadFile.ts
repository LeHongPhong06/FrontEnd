export interface ProgressFileType {
  name?: string;
  transfer: number;
  total: number;
}

export interface PayloadFileType {
  name: string;
  url: string;
  size: number;
}
