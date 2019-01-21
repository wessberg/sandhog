import {container} from "./services";
import {ICommandContainer} from "./command/i-command-container";

container.get<ICommandContainer>().run();
