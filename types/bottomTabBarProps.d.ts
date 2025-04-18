
export type BottomTabBarProps = {
    children: React.ReactNode;
    onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
}