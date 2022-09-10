// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ScheduleBuilder from './pages/ScheduleBuilder';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<ScheduleBuilder />
);

reportWebVitals();
