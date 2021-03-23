import React, { FC } from 'react';
import { DemoShareModal } from './DemoShareModal';

export const DemoExhibition: FC = function () {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <DemoShareModal title="分享任务" />
    </div>
  );
};
