const PDFDocument = require('pdfkit');
const toArrayBuffer = require('to-arraybuffer')
const sizeOf = require('buffer-image-size');
const sharp = require('sharp');
const fetch = require('node-fetch');
const getStream = require('get-stream');
const { strParseOut } = require('../utils/utility-functions');
const fs = require('fs-extra');
const path = require('node:path');

const pdfBuilder = async (categories, userData, contactMessage) => {
  const pdf = new PDFDocument ({
    size: 'A4',
    autoFirstPage: false,
  });
  pdf.info['Title'] = 'Listing'; 
  pdf
    .font(fs.readFileSync(path.join(__dirname, '..', 'assets', 'Montserrat-SemiBold.ttf')));

  // for some reason pdfkit doesn't add pages when it is called inside a forEach loop along
  // with a async request but for of does
  for (const c of categories) {
    pdf
      .addPage({
        layout: 'portrait',
        margins: {
          top: 300,
          right: 0,
          bottom: 0,
          left: 0
        }
      })
      .fontSize(20)
      .text(c.categoryName, {
        align: 'center',
        lineGap: 10
      })

    for (const p of c.pictures) {
      const res = await fetch(p.url);
      const body = await res.arrayBuffer();
      const buffer = Buffer.from(body);
      const imgBuffer = await sharp(buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toBuffer()
      const { width, height } = sizeOf(imgBuffer);
      const orientation = width > height ? 'horizontal' : 'vertical'
      const pageMargin = 40;

      pdf
        .addPage({
          layout: orientation === 'horizontal' ? 'landscape' : 'portrait',
          margin: 40
        })
        .image(imgBuffer, {
          fit: [pdf.page.width - pageMargin*2, pdf.page.height - pageMargin*2],
          align: 'center',
          valign: 'center',
        })    
    };
  }

  /*if (userData.contact_phone) {
    pdf
      .addPage({
        layout: 'portrait',
        margins: {
          top: 300,
          right: 0,
          bottom: 0,
          left: 0
        }
      })
      .fontSize(20)
      .text(contactMessage.bookAnAppointment, {
        align: 'center',
        lineGap: 10
      })
      .fontSize(28)
      .text(contactMessage.contactMeAt, {
        align: 'center',
        lineGap: 10
      })
      .fontSize(28)
      .text(userData.contact_phone, {
        align: 'center',
        lineGap: 10
      })
      .fontSize(28)
      .text(strParseOut(userData.names), {
        align: 'center'
      })
  }*/

  pdf.end();

  const pdfBuffer = await getStream.buffer(pdf);
  return pdfBuffer
}

module.exports = pdfBuilder;
