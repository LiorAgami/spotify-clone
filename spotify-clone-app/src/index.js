import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { DataLayer } from './state/DataLayer';
import reducer, { initialState } from './state/reducer';
import { SoundLayer } from "./state/SoundLayer";
import soundReducer, {soundInitialState} from "./state/SoundReducer";

ReactDOM.render(
	<React.StrictMode>
		<DataLayer initialState={initialState} reducer={reducer}>
			<SoundLayer initialState={soundInitialState} reducer={soundReducer}>
				<App/>
			</SoundLayer>
		</DataLayer>
	</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
