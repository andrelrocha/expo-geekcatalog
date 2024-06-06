import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyleProp, View, ViewStyle } from 'react-native';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';

type AppStarRatingProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    value: number;
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
    onChange: (rating: number) => void;
}

const AppStarRating = <T extends FieldValues>({
    control,
    name,
    value,
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
    onChange,
    ...props
  }: AppStarRatingProps<T>) => {
  
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <View>
                    {interactive ? (
                        <StarRating
                            {...props}
                            rating={value}
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
                            {...props}
                            rating={value}
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
            )}
        />
    );
  };
  
  export default AppStarRating;