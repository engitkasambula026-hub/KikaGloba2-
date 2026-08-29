export interface Office { id: string; flag: string; region: string; address: string; support: string; }
export interface Option { id: string; name: string; description: string; targetPath: string; }
export interface Category { categoryName: string; options: Option[]; }
