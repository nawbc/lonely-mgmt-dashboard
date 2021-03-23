import React, { FC, useState } from 'react';
import { DemoExhibition } from './DemoExhibition';
import { DemoLogin } from './DemoLogin';

export const DemoClient: FC = function () {
  const [login, setLogin] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {login ? <DemoExhibition /> : <DemoLogin onLogin={setLogin} />}
    </div>
  );
};
