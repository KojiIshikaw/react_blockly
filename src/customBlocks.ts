import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export const addCustomBlocks = () => {
	// 1. ブロックの定義を登録
	Blockly.Blocks['custom_block'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("カスタムブロック");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
			this.setTooltip("これはカスタムブロックです");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['custom_block2'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("カスタムブロック2");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
			this.setTooltip("これはカスタムブロック2です");
			this.setHelpUrl("");
		}
	};

	// 2. JavaScriptジェネレーターの定義
	javascriptGenerator.forBlock['custom_block'] = function (block) {
		const code = 'console.log("Custom Block Executed");\n';
		return code;
	};

	javascriptGenerator.forBlock['custom_block2'] = function (block) {
		const code = 'console.log("Custom Block2 Executed");\n';
		return code;
	};
};

// Workspaceの設定例
export const initializeWorkspace = () => {
	const workspace = Blockly.inject('blocklyDiv', {
		toolbox: {
			kind: 'flyoutToolbox',
			contents: [
				{
					kind: 'block',
					type: 'custom_block'
				},
				{
					kind: 'block',
					type: 'custom_block2'
				}
			]
		}
	});

	return workspace;
};