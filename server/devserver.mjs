// Temporary dev launcher — NOT part of the shipped app.
// Spins up an in-memory MongoDB and the real server against it, so the
// full stack can be exercised locally without a real MongoDB install.
import { MongoMemoryServer } from "mongodb-memory-server";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminUser from "./src/models/AdminUser.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mongod = await MongoMemoryServer.create();
const uri = mongod.getUri("serenly");
console.log("DEVSERVER_MONGO_URI=" + uri);

await mongoose.connect(uri);
const passwordHash = await bcrypt.hash("DevPassword123!", 10);
await AdminUser.findOneAndUpdate(
  { email: "felix@serenlydm.com" },
  { email: "felix@serenlydm.com", passwordHash, name: "Felix Ngunga" },
  { upsert: true, new: true, setDefaultsOnInsert: true },
);
console.log("Seeded dev admin: felix@serenlydm.com / DevPassword123!");
await mongoose.connection.close();

const child = spawn(process.execPath, [path.join(__dirname, "src/index.js")], {
  cwd: __dirname,
  env: {
    ...process.env,
    MONGO_URI: uri,
    JWT_SECRET: "dev-secret-not-for-production",
    PORT: "5000",
    CORS_ORIGIN: "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,http://localhost:5178",
    ADMIN_EMAIL: "felix@serenlydm.com",
    ADMIN_PASSWORD: "DevPassword123!",
    ADMIN_NAME: "Felix Ngunga",
  },
  stdio: "inherit",
});

process.on("SIGINT", async () => {
  child.kill();
  await mongod.stop();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  child.kill();
  await mongod.stop();
  process.exit(0);
});
