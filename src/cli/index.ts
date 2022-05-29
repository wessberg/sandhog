import {createProgram} from "./command/create-program.js";
import {createCocCommand} from "./command/coc/coc-command.js";
import {createFundingCommand} from "./command/funding/funding-command.js";
import {createContributingCommand} from "./command/contributing/contributing-command.js";
import {createLicenseCommand} from "./command/license/license-command.js";
import {createReadmeCommand} from "./command/readme/readme-command.js";
import {createAllCommand} from "./command/all/all-command.js";
import {createHelpCommand} from "./command/help/help-command.js";

const program = createProgram();

createCocCommand(program);
createFundingCommand(program);
createContributingCommand(program);
createLicenseCommand(program);
createReadmeCommand(program);
createAllCommand(program);
createHelpCommand(program);
program.parse();
