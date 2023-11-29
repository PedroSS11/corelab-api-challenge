import * as path from "path";
import moduleAlias from "module-alias";

const files = path.resolve(__dirname, "../..");

moduleAlias.addAliases({
  "@src": path.join(files, "src"),
  "@config": path.join(files, "src/app/config"),
  "@modules": path.join(files, "src/app/modules"),
  "@controllers": path.join(files, "src/app/controllers"),
  "@services": path.join(files, "src/app/services"),
  "@repositories": path.join(files, "src/app/repositories"),
  "@middlewares": path.join(files, "src/app/middlewares"),
  "@dto": path.join(files, "src/app/dto"),
});
