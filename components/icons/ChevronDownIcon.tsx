import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChevronDownIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  width = 24,
  height = 24,
  fill = 'black',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.70498 8.99998C6.31498 9.38998 6.31498 10.02 6.70498 10.41L11.295 15C11.685 15.39 12.315 15.39 12.705 15L17.295 10.41C17.685 10.02 17.685 9.38998 17.295 8.99998C16.905 8.60998 16.275 8.60998 15.885 8.99998L11.995 12.88L8.11498 8.99998C7.72498 8.60998 7.08498 8.61998 6.70498 8.99998Z"
        fill={fill}
      />
    </Svg>
  );
};
