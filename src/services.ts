import {DIContainer} from "@wessberg/di";
import {ICommandContainer} from "./command/i-command-container";
import {CommandContainer} from "./command/command-container";
import {IReadmeTask, ReadmeTaskWrapper} from "./task/readme-task/i-readme-task";
import {ReadmeTask} from "./task/readme-task/readme-task";
import {IReadmeCommand} from "./command/readme-command/i-readme-command";
import {ReadmeCommand} from "./command/readme-command/readme-command";
import {IConfig} from "./config/i-config";
import {config} from "./config/config";
import {Commands} from "./command/commands";
import {IReadmeService} from "./service/readme/i-readme-service";
import {ReadmeService} from "./service/readme/readme-service";
import {IFormatter} from "./formatter/i-formatter";
import {ILicenseService} from "./service/license/i-license-service";
import {LicenseService} from "./service/license/license-service";
import {FileLoader, IFileLoader} from "@wessberg/fileloader";
import {FileSaver, IFileSaver} from "@wessberg/filesaver";
import {IProjectService} from "./service/project/i-project-service";
import {ProjectService} from "./service/project/project-service";
import {IPatreonService} from "./service/backing-service/patreon-service/i-patreon-service";
import {PatreonService} from "./service/backing-service/patreon-service/patreon-service";
import {IBackingService} from "./service/backing-service/i-backing-service";
import {BackingService} from "./service/backing-service/backing-service";
import {IMarkdownParserService} from "./service/parser/markdown/i-markdown-parser-service";
import {MarkdownParserService} from "./service/parser/markdown/markdown-parser-service";
import {IReadmeServiceConfig} from "./service/readme/i-readme-service-config";
import {readmeServiceConfig} from "./service/readme/readme-service-config";
import {ContributorService} from "./service/contributor-service/contributor-service";
import {IContributorService} from "./service/contributor-service/i-contributor-service";
import {ILicenseTask, LicenseTaskWrapper} from "./task/license-task/i-license-task";
import {LicenseTask} from "./task/license-task/license-task";
import {ILicenseCommand} from "./command/license-command/i-license-command";
import {LicenseCommand} from "./command/license-command/license-command";
import {ContributingCommand} from "./command/contributing-command/contributing-command";
import {IContributingCommand} from "./command/contributing-command/i-contributing-command";
import {ContributingTask} from "./task/contributing-task/contributing-task";
import {ContributingTaskWrapper, IContributingTask} from "./task/contributing-task/i-contributing-task";
import {CocCommand} from "./command/coc-command/coc-command";
import {ICocCommand} from "./command/coc-command/i-coc-command";
import {CocTask} from "./task/coc-task/coc-task";
import {CocTaskWrapper, ICocTask} from "./task/coc-task/i-coc-task";
import {ICocService} from "./service/coc-service/i-coc-service";
import {CocService} from "./service/coc-service/coc-service";
import {Formatter} from "./formatter/formatter";

export const container = new DIContainer();

// Services
container.registerSingleton<IReadmeService, ReadmeService>();
container.registerSingleton<ILicenseService, LicenseService>();
container.registerSingleton<IFormatter, Formatter>();
container.registerSingleton<IFileLoader, FileLoader>();
container.registerSingleton<IFileSaver, FileSaver>();
container.registerSingleton<IProjectService, ProjectService>();
container.registerSingleton<IPatreonService, PatreonService>();
container.registerSingleton<IBackingService, BackingService>();
container.registerSingleton<IContributorService, ContributorService>();
container.registerSingleton<ICocService, CocService>();
container.registerSingleton<IMarkdownParserService, MarkdownParserService>();

// Writers

// Configuration
container.registerSingleton<IConfig>(() => config);
container.registerSingleton<IReadmeServiceConfig>(() => readmeServiceConfig);

// Commands
container.registerSingleton<ICommandContainer, CommandContainer>();
container.registerSingleton<IReadmeCommand, ReadmeCommand>();
container.registerSingleton<ILicenseCommand, LicenseCommand>();
container.registerSingleton<IContributingCommand, ContributingCommand>();
container.registerSingleton<ICocCommand, CocCommand>();

container.registerSingleton<Commands>(() => [container.get<IReadmeCommand>(), container.get<ILicenseCommand>(), container.get<IContributingCommand>(), container.get<ICocCommand>()]);

// Tasks
container.registerTransient<IReadmeTask, ReadmeTask>();
container.registerTransient<ILicenseTask, LicenseTask>();
container.registerTransient<IContributingTask, ContributingTask>();
container.registerTransient<ICocTask, CocTask>();

// Task wrappers
container.registerSingleton<ReadmeTaskWrapper>(() => () => container.get<IReadmeTask>());
container.registerSingleton<LicenseTaskWrapper>(() => () => container.get<ILicenseTask>());
container.registerSingleton<ContributingTaskWrapper>(() => () => container.get<IContributingTask>());
container.registerSingleton<CocTaskWrapper>(() => () => container.get<ICocTask>());
