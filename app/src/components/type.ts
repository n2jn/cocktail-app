export type SectionType =
  | 'topLeft'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'middleRight'
  | 'middleLeft'
  | 'middle';

export type SectionObject = {
  text?: string;
  icon?: string;
  image?: string;
  onPress?: () => void;
};

export type SectionProps = {
  [Section in SectionType]?: SectionObject;
};
