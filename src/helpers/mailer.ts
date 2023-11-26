import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hash token
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    //update user verifytoken and forgot passwordtoken
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    //create transport
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "93901fcb7d39fe",
        pass: "685bfb32dde227",
        // TODO : add theese credintials to .env
      },
    });
    const mailOptions = {
      from: "hehe@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>
        Click
        <a href=${process.env.DOMAIN}/${
        emailType === "RESET" ? "changepassword" : "verifytoken"
      }?token=${hashToken}>here</a> to ${
        emailType === "VERIFY" ? "Verify your account" : "Reset your password"
      }
    </p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
