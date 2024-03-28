// A component for providing all the remaining height after navbar takes it's place on the screen

import { FC, ReactNode } from "react";

interface PlayAreaProps {
  children: ReactNode | ReactNode[];
}

export const PlayArea: FC<PlayAreaProps> = ({ children }) => {
  return (
    <div className="min-h-[calc(100vh-58px)]">
      {children}
    </div>
  );
};
