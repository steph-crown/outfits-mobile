import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrowRightIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
  width = 25,
  height = 25,
  fill = "#DB0F4B",
}) => (
  <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
    <Path
      d="M5.62659 13.0139H16.7966L11.9166 17.8939C11.5266 18.2839 11.5266 18.9239 11.9166 19.3139C12.3066 19.7039 12.9366 19.7039 13.3266 19.3139L19.9166 12.7239C20.3066 12.3339 20.3066 11.7039 19.9166 11.3139L13.3366 4.71389C12.9466 4.32389 12.3166 4.32389 11.9266 4.71389C11.5366 5.10389 11.5366 5.73389 11.9266 6.12389L16.7966 11.0139H5.62659C5.07659 11.0139 4.62659 11.4639 4.62659 12.0139C4.62659 12.5639 5.07659 13.0139 5.62659 13.0139Z"
      fill={fill}
    />
  </Svg>
);
