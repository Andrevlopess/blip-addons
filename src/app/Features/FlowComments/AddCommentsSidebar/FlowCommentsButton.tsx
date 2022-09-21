import * as React from 'react';
import { BdsIcon, BdsTooltip } from 'blip-ds/dist/blip-ds-react';

export type FlowCommentsButtonProps = {
  onClick: () => void;
};

export const FlowCommentsButton = ({ onClick }: FlowCommentsButtonProps): JSX.Element => (
  <li>
    <BdsTooltip
      className="cursor-pointer"
      position="right-center"
      tooltipText="Comentários"
      onClick={onClick}
    >
      <div className="builder-icon-bg flex justify-center items-center">
        <BdsIcon
          size="medium"
          class="builder-icon bds-icon bds-icon__size--medium"
          theme="outline"
          name="user-engaged"
        />
      </div>
    </BdsTooltip>
  </li>
);
