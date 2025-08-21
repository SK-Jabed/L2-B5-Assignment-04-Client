import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[2520px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-24 space-y-24">
      {children}
    </div>
  );
};

export default Container;