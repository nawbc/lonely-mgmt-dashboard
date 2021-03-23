import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LoginAccess } from './components';
import { route } from './route';
import { GlobalContext, globalProvider } from './provider';

const queryClient = new QueryClient();

const App = function () {
  return (
    <div
      id="pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <GlobalContext.Provider value={globalProvider}>
        <QueryClientProvider client={queryClient}>
          <HashRouter>
            <LoginAccess>
              <Switch>
                {route.map((r, i) => {
                  return <Route key={i} {...r} />;
                })}
              </Switch>
            </LoginAccess>
          </HashRouter>
        </QueryClientProvider>
      </GlobalContext.Provider>
    </div>
  );
};

export default App;
