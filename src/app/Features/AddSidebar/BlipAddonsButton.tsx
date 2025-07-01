import * as React from 'react';
import { BdsIcon, BdsTooltip } from 'blip-ds/dist/blip-ds-react';

export type BlipsButtonProps = {
  onClick: () => void;
};

export const BlipsButton = ({ onClick }: BlipsButtonProps): JSX.Element => (
  <BdsTooltip
    className="cursor-pointer"
    position="right-center"
    tooltipText="Blip Addons"
    onClick={onClick}
  >
    <div className="flex justify-center items-center" style={{
      height: '48px',
      width: '48px',
      opacity: '0.8',
      backgroundColor: '#1a2437'
    }}>
      <BdsIcon
        size="medium"
        class="builder-icon bds-icon bds-icon__size--medium"
        theme="outline"
        name="favorite"
      />
    </div>
  </BdsTooltip>
);
