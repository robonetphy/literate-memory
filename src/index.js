import {
  PDFDocument,
  rgb,
  degrees,
  StandardFonts,
  PDFForm,
  PDFFont,
} from "pdf-lib";
import fs from "fs-extra";
import path from "path";
import fontkit from "@pdf-lib/fontkit";

async function createInvitationWith(name, base_path) {
  // Read the existing PDF file
  const existingPdfBytes = fs.readFileSync("invitation.pdf");

  // Load the PDF document
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  // Add a new page to the PDF document
  const fontBytes = fs.readFileSync(path.join(process.cwd(), 'gujarati.ttf'));
  const customFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  console.log(name.charCodeAt(0));
  console.log(String.fromCharCode(2693));
  console.log(customFont.encodeText('q'));



  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  var allname = "";
  for (var i=2690;i<2900;i++){
    allname += String.fromCharCode(i)+' ';
  }
  console.log(allname);
  firstPage.drawText('name', {
    x: 310,
    y: 225,
    size: 14,
    font: customFont,
    color: rgb(0.95, 0.1, 0.1),
  });

  // Save the modified PDF document
  const modifiedPdfBytes = await pdfDoc.save();
  // Get the absolute path.
  const absPath = path.join(base_path, `${name}.pdf`);
  fs.writeFileSync(absPath, modifiedPdfBytes);
}

async function readNamesAndGenerateInvitation() {
  const base_path = path.join(process.cwd(), "output");
  fs.ensureDirSync(base_path);
  const data = fs.readFileSync("names.json",'utf-8');
  const json = JSON.parse(data);
  console.log(json);
  await json["names"].forEach(async (name) => {
    await createInvitationWith(name, base_path);
  });
}
// Call the async function
readNamesAndGenerateInvitation();
