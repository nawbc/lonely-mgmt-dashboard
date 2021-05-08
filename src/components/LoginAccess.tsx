import React, { useContext, useState } from 'react';
import { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { loginJwt } from '../api';
import { GlobalContext } from '../provider';

function usePageViews() {
  const h = useHistory();
  const location = useLocation();
  React.useEffect(() => {
    const jwt = localStorage.getItem('t');
    if (!jwt) {
      h.replace('/login');
    }
  }, [location.pathname]);
}

export const LoginAccess: FC = function (props) {
  usePageViews();
  const h = useHistory();
  const ctx = useContext(GlobalContext);
  const [shouldRender, setRender] = useState(false);

  useEffect(() => {
    (async function () {
      const t = localStorage.getItem('t');
      if (!t) {
        setRender(true);
        h.replace('/login');
        return;
      }

      const { data } = await loginJwt();

      setRender(true);
      if (data.code > 0) {
        data.data && ctx.setUser(data.data);
        if (h.location.pathname.trim() === '/') h.replace('/dash');
      } else {
        h.replace('/login');
      }
    })();
  }, []);

  return shouldRender ? (props.children as any) : null;
};
