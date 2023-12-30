import { IncomingForm } from "formidable";
import cloudinary from "../../../cloudinary";

import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req, res) {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return NextResponse.json({ error: "Error parsing the files" });
    }
    try {
      const result = await cloudinary.uploader.upload(files.file.filepath);
      NextResponse.json({ url: result.secure_url });
    } catch (error) {
      NextResponse.json({ error: "Error uploading to Cloudinary" });
    }
  });
}
