/* eslint-disable import/prefer-default-export */
import { Middleware, MiddlewareAPI } from 'redux';
import { TWsOrdersActions } from 'services/types';
import { getCookie } from 'utils/cookies';

export const socketMiddleware =
  (wsUrl: string, wsActions: TWsOrdersActions): Middleware =>
  (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsAllOrdersInit,
        wsUserOrdersInit,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;
      if (type === wsAllOrdersInit) {
        socket = new WebSocket(`${wsUrl}/orders/all`);
      }
      if (type === wsUserOrdersInit) {
        const token = getCookie('accessToken').replace('Bearer ', '');
        socket = new WebSocket(`${wsUrl}/orders?token=${token}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
