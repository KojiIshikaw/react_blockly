// App.tsx
import React, { useEffect } from 'react';
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { addCustomBlocks } from './customBlocks';

const App: React.FC = () => {
	useEffect(() => {
		addCustomBlocks();

		// Blocklyワークスペースの初期化
		const workspace = Blockly.inject('blocklyDiv', {
			toolbox: `
                <xml xmlns="https://developers.google.com/blockly/xml">
                    <block type="custom_block"></block>
                </xml>
            `,
		});

		// 必要に応じてJavaScriptコードを生成
		const code = javascriptGenerator.workspaceToCode(workspace);
		console.log(code);
	}, []);

	return (
		<div>
			<h1>Blockly with React and Vite</h1>
			<div id="blocklyDiv" style={{ height: '480px', width: '600px' }}></div>
		</div>
	);
};

export default App;