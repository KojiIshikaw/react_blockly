// App.tsx
import React, { useEffect } from 'react';
import { addCustomBlocks, initializeWorkspace, getXML } from './customBlocks';

const App: React.FC = () => {
	useEffect(() => {
		// カスタムブロックを初期化
		addCustomBlocks();

		// Blockly ワークスペースの初期化
		const workspace = initializeWorkspace();

		// クリーンアップ関数
		return () => {
			workspace.dispose();
		};
	}, []);

	// ボタンがクリックされたときのハンドラ
	const handleGetXML = () => {
		const xml = getXML();
		if (xml) {
			console.log('Blockly Workspace XML:', xml);
			alert(xml); // 簡単な表示例。必要に応じて他の方法で表示や保存を実装
		} else {
			console.warn('Workspace is not initialized.');
		}
	};

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

			<button onClick={handleGetXML} style={{ marginTop: '10px' }}>
				Get XML
			</button>
		</div>
	);
};

export default App;
