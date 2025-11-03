export type BlockType = 'paragraph' | 'heading' | 'image';

export interface BaseBlock {
  id: string;
  type: BlockType;
  content: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  level: 1 | 2 | 3;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  alt: string;
  url: string;
}

export type Block = ParagraphBlock | HeadingBlock | ImageBlock;

export interface EditorContent {
  blocks: Block[];
}