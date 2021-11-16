import { createProgram } from "./command/create-program";
import { createCocCommand } from "./command/coc/coc-command";
import { createFundingCommand } from "./command/funding/funding-command";
import { createContributingCommand } from "./command/contributing/contributing-command";
import { createLicenseCommand } from "./command/license/license-command";
import { createReadmeCommand } from "./command/readme/readme-command";
import { createAllCommand } from "./command/all/all-command";
import { createHelpCommand } from "./command/help/help-command";

const program = createProgram();

createCocCommand(program);
createFundingCommand(program)
createContributingCommand(program);
createLicenseCommand(program);
createReadmeCommand(program);
createAllCommand(program);
createHelpCommand(program);
program.parse();