import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { log } from '@/utils/util';

window.log = log;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
