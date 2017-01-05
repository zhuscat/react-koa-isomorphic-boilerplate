import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import routes from '../../client/routes';
import configureStore from '../../client/store/configureStore';
import config from '../config';

function _match(location) {
  return new Promise((resolve, reject) => {
    match(location, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
      } else {
        resolve({ redirectLocation, renderProps });
      }
    });
  });
}

export default async (ctx, next) => {
  const store = configureStore();
  try {
    const { redirectLocation, renderProps } = await _match({ routes, location: ctx.url });

    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const components = renderProps.components.filter(component => component && component.WrappedComponent && typeof component.WrappedComponent.fetchData === 'function');
      const promises = [];
      components.forEach((component) => {
        const tasks = component.WrappedComponent.fetchData({
          dispatch: store.dispatch,
          location: renderProps.location,
          params: renderProps.params,
        });
        if (Array.isArray(tasks)) {
          tasks.forEach((task) => {
            promises.push(task);
          });
        } else {
          promises.push(tasks);
        }
      });
      await Promise.all(promises);

      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>);

      await ctx.render('index', {
        title: config.title,
        app: html,
        reduxState: store.getState(),
        development: ctx.app.env === 'development',
      });
    } else {
      await next();
    }
  } catch (e) {
    console.log('error occurred during server rendering: %s', e.stack);

    await ctx.render('500', {
      message: e.stack,
    });
  }
};
