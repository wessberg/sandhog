import "./services";
import {DIContainer} from "@wessberg/di";
import {ICommandContainer} from "./command/i-command-container";

DIContainer.get<ICommandContainer>()
	.run();