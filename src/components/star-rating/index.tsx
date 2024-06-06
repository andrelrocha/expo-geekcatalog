import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';

interface AppStarRatingProps {
    initialRating?: number;
    maxStars?: number;
    starSize?: number;
    color?: string;
    emptyColor?: string;
    style?: StyleProp<ViewStyle>;
    starStyle?: StyleProp<ViewStyle>;
    enableHalfStar?: boolean;
    enableSwiping?: boolean;
    onRatingStart?: () => void;
    onRatingEnd?: () => void;
    animationConfig?: any;
    StarIconComponent?: (props: { size: number; color: string; type: 'full' | 'half' | 'empty' }) => JSX.Element;
    interactive?: boolean;
    rating: number;
    onChange: (rating: number) => void;
}

const AppStarRating: React.FC<AppStarRatingProps> = ({
    initialRating = 0,
    maxStars = 5,
    starSize = 32,
    color = "#fdd835",
    emptyColor,
    style,
    starStyle,
    enableHalfStar = true,
    enableSwiping = true,
    onRatingStart,
    onRatingEnd,
    animationConfig,
    StarIconComponent,
    interactive = true,
    rating,
    onChange,
  }) => {
  
    return (
      <View style={style}>
        {interactive ? (
          <StarRating
            rating={rating}
            onChange={onChange}
            maxStars={maxStars}
            starSize={starSize}
            color={color}
            emptyColor={emptyColor}
            starStyle={starStyle}
            enableHalfStar={enableHalfStar}
            enableSwiping={enableSwiping}
            onRatingStart={onRatingStart}
            onRatingEnd={onRatingEnd}
            animationConfig={animationConfig}
            StarIconComponent={StarIconComponent}
          />
        ) : (
          <StarRatingDisplay
            rating={rating}
            maxStars={maxStars}
            starSize={starSize}
            color={color}
            emptyColor={emptyColor}
            starStyle={starStyle}
            enableHalfStar={enableHalfStar}
            StarIconComponent={StarIconComponent}
          />
        )}
      </View>
    );
  };
  
  export default AppStarRating;