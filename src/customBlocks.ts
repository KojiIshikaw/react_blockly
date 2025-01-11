import * as Blockly from 'blockly';
// import { javascriptGenerator } from 'blockly/javascript';

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

	Blockly.Blocks['start_block'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("スタートブロック");
			this.setPreviousStatement(false, null);
			this.setNextStatement(true, null);
			this.setColour(120);
			this.setTooltip("これはスタートブロックです");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['end_block'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("エンドブロック");
			this.setPreviousStatement(true, null);
			this.setNextStatement(false, null);
			this.setColour(150);
			this.setTooltip("これはエンドブロックです");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['if_block'] = {
		init: function () {
			this.appendValueInput("CONDITION")
				.setCheck("Boolean")
				.appendField("もし");
			this.appendDummyInput()
				.appendField("なら");
			this.appendStatementInput("DO")
				.appendField("実行");
			this.appendStatementInput("ELSE")
				.appendField("でなければ");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(210);
			this.setTooltip("if-else条件分岐");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['boolean_block'] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					["真 (true)", "TRUE"],
					["偽 (false)", "FALSE"]
				]), "BOOL");
			this.setOutput(true, "Boolean");
			this.setColour(210);
			this.setTooltip("真または偽の値");
			this.setHelpUrl("");
		}
	};

	// // 2. JavaScriptジェネレーターの定義
	// javascriptGenerator.forBlock['custom_block'] = function (block) {
	// 	const code = 'console.log("Custom Block Executed");\n';
	// 	return code;
	// };

	// javascriptGenerator.forBlock['custom_block2'] = function (block) {
	// 	const code = 'console.log("Custom Block2 Executed");\n';
	// 	return code;
	// };

	// javascriptGenerator.forBlock['start_block'] = function (block) {
	// 	const code = 'console.log("Start Block Executed");\n';
	// 	return code;
	// };

	// javascriptGenerator.forBlock['end_block'] = function (block) {
	// 	const code = 'console.log("End Block2 Executed");\n';
	// 	return code;
	// };

	// javascriptGenerator.forBlock['if_block'] = function (block) {
	// 	const condition = javascriptGenerator.valueToCode(block, 'CONDITION', 0) || 'false';
	// 	const statements = javascriptGenerator.statementToCode(block, 'DO');
	// 	const elseStatements = javascriptGenerator.statementToCode(block, 'ELSE');
	// 	const code = `if (${condition}) {\n${statements}} else {\n${elseStatements}}\n`;
	// 	return code;
	// };

	// javascriptGenerator.forBlock['boolean_block'] = function (block) {
	// 	const bool = block.getFieldValue('BOOL') === 'TRUE' ? 'true' : 'false';
	// 	return [bool, javascriptGenerator.ORDER_ATOMIC];
	// };
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
				},
				{
					kind: 'block',
					type: 'start_block'
				},
				{
					kind: 'block',
					type: 'end_block'
				},
				{
					kind: 'block',
					type: 'if_block'
				},
				{
					kind: 'block',
					type: 'boolean_block'
				}
			]
		}
	});

	return workspace;
};