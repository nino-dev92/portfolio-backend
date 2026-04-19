import express, { type Request, type Response } from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

app.use(cors());
app.use(express.json());

const PORT: string | number = (process.env.PORT as string) || 3000;

const main = async (
  name: string,
  email: string,
  message: string,
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: "nnejirichard@yahoo.com",
    subject: "Portfolio Message ✔",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  });

  console.log("Message sent: %s", info.messageId);
};

app.post("/send-email", (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  main(name, email, message);
  res.send("Email sent successfully!");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running successfully!");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
