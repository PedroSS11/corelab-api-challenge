import * as dotenv from "dotenv";
import { Server } from "@overnightjs/core";
import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";
import sequelize from "./app/config/sequelize";
import bodyParser from "body-parser";
import { UserController } from "./app/controllers/UserController";
import { UserService } from "./app/services/UserService";
import { UserRepository } from "./app/repositories/UserRepository";
import { PostController } from "./app/controllers/PostController";
import { PostService } from "./app/services/PostService";
import { PostRepository } from "./app/repositories/PostRepository";
const cors = require("cors");
dotenv.config();

export class SetupApplication extends Server {
  private readonly port: number;

  constructor(port: number = parseInt(process.env.PORT || "8080", 10)) {
    super();
    this.port = port;
  }

  private registerBulk(container: DependencyContainer, classes: any[]): void {
    classes.forEach((cls) => {
      container.register(cls.name, { useClass: cls });
    });
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private setupControllers(): void {
    const classesToRegister = [
      UserController,
      UserService,
      UserRepository,
      PostController,
      PostService,
      PostRepository,
    ];

    this.registerBulk(container, classesToRegister);

    const userController = container.resolve(UserController);
    const postController = container.resolve(PostController);

    this.addControllers([userController, postController]);
  }

  public async start(): Promise<void> {
    await sequelize.sync({ alter: true });
    this.app.listen(this.port, () => {
      console.log(`SERVER RUNNING ON PORT ${this.port}`);
    });
  }
}
