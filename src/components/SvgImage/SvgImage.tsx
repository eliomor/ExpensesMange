import React from 'react';
import {SvgXml} from 'react-native-svg';

interface SvgImageProps {
  xml: string;
  width: number;
  height: number;
}

const SvgImage: React.FC<SvgImageProps> = ({xml, width, height}) => {
  return <SvgXml xml={xml} width={width} height={height} />;
};

export default SvgImage;
