// App.tsx
import React, { useEffect } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { addCustomBlocks } from './customBlocks';

const App: React.FC = () => {
	useEffect(() => {
		// カスタムブロックを初期化
		addCustomBlocks();

		// モダンな形式でツールボックスを定義
		const toolboxConfiguration = {
			kind: 'flyoutToolbox',
			contents: [
				{
					kind: 'block',
					type: 'custom_block'
				}
			]
		};

		// Blocklyワークスペースの初期化
		const workspace = Blockly.inject('blocklyDiv', {
			toolbox: toolboxConfiguration
		});

		// クリーンアップ関数
		return () => {
			workspace.dispose();
		};
	}, []);

	return (
		<div>
			<h1>Blockly with React and Vite</h1>
			<div
				id="blocklyDiv"
				style={{
					height: '480px',
					width: '600px',
					border: '1px solid #ccc'  // 視覚的なフィードバック用
				}}
			/>
		</div>
	);
};

export default App;