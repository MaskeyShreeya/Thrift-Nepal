type Tab = 'Home' | 'Discover' | 'Favorite' | 'Cart';

let listener: ((tab: Tab) => void) | null = null;

export const registerTabListener = (fn: (tab: Tab) => void) => {
  listener = fn;
};

export const goToTab = (tab: Tab) => {
  listener?.(tab);
};
