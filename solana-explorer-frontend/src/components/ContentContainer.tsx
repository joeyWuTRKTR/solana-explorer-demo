import { FC } from "react";
export const ContentContainer: FC = props => {

  return (
    <div className="items-center  drawer-content w-2/3 mx-auto">
      {props.children}
    </div>
  );
};
