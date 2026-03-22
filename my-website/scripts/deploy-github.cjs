/* eslint-disable no-console */
const {spawnSync} = require("child_process");

function run(command, args, env = process.env) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env,
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with code ${result.status}`);
  }
}

function main() {
  const env = {...process.env};
  if (!env.GIT_USER && !env.USE_SSH) {
    env.GIT_USER = "SamprasZheng";
    console.log("GIT_USER not set. Defaulting to SamprasZheng.");
  }

  try {
    run("yarn", ["docusaurus", "deploy"], env);
  } catch (error) {
    console.error("Deploy failed.");
    console.error(
      "Tip: set credentials before deploy, e.g. GIT_USER + token or USE_SSH=true."
    );
    throw error;
  }
}

main();
