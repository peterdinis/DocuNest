import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { db } from '@/app/_utils/database';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = './uploads';
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'File upload failed' });
      return;
    }

    const file = files.file as formidable.File;
    const userId = fields.userId as string;

    // Calculate file size in bytes
    const fileSize = fs.statSync(file.path).size;

    // Create or update document record in the database
    const document = await db.document.create({
      data: {
        userId,
        title: file.originalFilename,
        contentSize: fileSize,
        // Add other fields as necessary
      },
    });

    res.status(200).json({ document });
  });
};

export default upload;