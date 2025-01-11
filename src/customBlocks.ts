import * as Blockly from 'blockly';
import { pythonGenerator, Order } from 'blockly/python';

let workspaceInstance: Blockly.WorkspaceSvg | null = null;

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

	// Pythonジェネレーターの定義を追加
	definePythonGenerators();
};

// 2. Pythonジェネレーターの定義
const definePythonGenerators = () => {
	pythonGenerator.forBlock['custom_block'] = function (block: Blockly.Block) {
		const code = `print("Custom Block Executed")\n`;
		return code;
	};

	pythonGenerator.forBlock['custom_block2'] = function (block: Blockly.Block) {
		const code = `print("Custom Block2 Executed")\n`;
		return code;
	};

	pythonGenerator.forBlock['start_block'] = function (block: Blockly.Block) {
		const code = `# Start Block\n`;
		return code;
	};

	pythonGenerator.forBlock['end_block'] = function (block: Blockly.Block) {
		const code = `# End Block\n`;
		return code;
	};

	pythonGenerator.forBlock['if_block'] = function (block: Blockly.Block) {
		const condition = pythonGenerator.valueToCode(block, 'CONDITION', Order.NONE) || 'False';
		const doCode = pythonGenerator.statementToCode(block, 'DO') || '# do something\n';
		const elseCode = pythonGenerator.statementToCode(block, 'ELSE') || '# else do something\n';
		const code = `if ${condition}:\n${indentCode(doCode)}else:\n${indentCode(elseCode)}`;
		return code;
	};

	pythonGenerator.forBlock['boolean_block'] = function (block: Blockly.Block) {
		const bool = block.getFieldValue('BOOL') === 'TRUE' ? 'True' : 'False';
		return [bool, Order.ATOMIC];
	};
};

// インデントを追加するヘルパー関数
const indentCode = (code: string, indent: number = 4): string => {
	const indentation = ' '.repeat(indent);
	return code
		.split('\n')
		.map(line => (line.trim() ? indentation + line : line))
		.join('\n');
};

// Workspaceの設定例
export const initializeWorkspace = () => {
	workspaceInstance = Blockly.inject('blocklyDiv', {
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

	return workspaceInstance;
};

// XML を取得する関数
export const getXML = (): string | null => {
	if (workspaceInstance) {
		const xmlDom = Blockly.Xml.workspaceToDom(workspaceInstance);
		const xmlText = Blockly.Xml.domToPrettyText(xmlDom); // フォーマットされた XML
		return xmlText;
	}
	return null;
};

// Pythonコードを生成する関数
export const generatePythonCode = (): string | null => {
	if (workspaceInstance) {
		const pythonCode = pythonGenerator.workspaceToCode(workspaceInstance);
		return pythonCode;
	}
	return null;
};
