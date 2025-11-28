import dotenv from "dotenv";
import ngrok from "ngrok";

dotenv.config();

const authToken = process.env.NGROK_AUTH_TOKEN;

const startNgrok = async () => {
  if (!authToken) {
    throw new Error(
      "NGROK_AUTH_TOKEN is not defined in environment variables.",
    );
  }
  const url = await ngrok.connect({
    address: 3000,
    authtoken: authToken,
    hostname: "overanimatedly-dragonish-rosalee.ngrok-free.dev",
  });
  console.log("Ngrok URL:", url);
};

process.on("SIGINT", async () => {
  console.log("Disconnecting ngrok...");
  await ngrok.disconnect();
  await ngrok.kill();
  process.exit();
});

startNgrok();
