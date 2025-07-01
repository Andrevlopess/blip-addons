import * as React from 'react';
import { BdsIcon, BdsTooltip } from 'blip-ds/dist/blip-ds-react';
import { setSettings, Settings } from '~/Settings';

const INACTIVE_ICON = 'screen-full';
const ACTIVE_ICON = 'screen-fill';

export type BlipsCleanButtonProps = {
  clean: () => void;
  undo: () => void;
};

export const CleanButton = ({
  clean,
  undo,
}: BlipsCleanButtonProps): JSX.Element => {
  const [isActive, setIsActive] = React.useState(Settings.isCleanEnviroment);

  const handleClick = (): void => {
    const shouldClean = !isActive;

    if (shouldClean) {
      clean();
    } else {
      undo();
    }

    setIsActive(shouldClean);
    setSettings({ isCleanEnviroment: shouldClean });
  };

  return (
    <BdsTooltip
      className="cursor-pointer"
      position="right-center"
      tooltipText="Limpar ambiente"
      onClick={handleClick}
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
          name={isActive ? ACTIVE_ICON : INACTIVE_ICON}
        />
      </div>
    </BdsTooltip>
  );
};
