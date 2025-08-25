import React from 'react';
import { Svg, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

interface TikTokIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export function TikTokIcon({ 
  width = 17, 
  height = 20, 
  fill = "#050413" 
}: TikTokIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 20" fill="none">
      <G clipPath="url(#clip0_393_2700)">
        <Path
          d="M14.4608 4.00883C13.4105 3.30649 12.6531 2.18226 12.4164 0.872401C12.3655 0.58946 12.3372 0.297991 12.3372 0H8.98579L8.98041 13.7798C8.92418 15.3229 7.68611 16.5616 6.16884 16.5616C5.69698 16.5616 5.253 16.4407 4.86182 16.2295C3.96505 15.7454 3.3514 14.7811 3.3514 13.6715C3.3514 12.0777 4.61538 10.7808 6.16835 10.7808C6.45831 10.7808 6.73653 10.83 6.9996 10.9143V7.40412C6.72724 7.36599 6.45048 7.34241 6.16835 7.34241C2.76708 7.34241 0 10.1814 0 13.6715C0 15.8126 1.04248 17.7074 2.63359 18.8532C3.63549 19.5751 4.85449 20 6.16884 20C9.57011 20 12.3372 17.1611 12.3372 13.6715V6.68372C13.6515 7.65144 15.2622 8.22184 17 8.22184V4.7834C16.0641 4.7834 15.1923 4.49796 14.4608 4.00883Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_393_2700">
          <Rect width="17" height="20" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
}
