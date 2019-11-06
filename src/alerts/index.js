import './style.css';

import AlertsManager from './manager'
import AlertsContainer from './container'

export default AlertsContainer

export const addAlert = (message, timeout) => AlertsManager.add({
  timeout,
  message,
});
